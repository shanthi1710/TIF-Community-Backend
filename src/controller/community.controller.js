import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Role} from "../model/role.model.js";
import {Member} from "../model/member.model.js";
import {Community} from "../model/community.model.js";

const createCommunity = asyncHandler(async (req,res,_) => {
    /*
        - Get the name of the community from the request body
        - Create a slug from the name and unique
        - Get the user ID From the request object
        - Create a new community
        - Get the community admin role
        - Create a new member with the user as the owner
        - and the role as the community admin
        - Return the community and the member
    */
    try {
        const { name } = req.body;

        const slug = name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');

        const ownerId = req.user._id;

        const community = await Community.create({
            name,
            slug,
            owner:ownerId,
        });

        const adminRole = await Role.findOne({ name: 'Community Admin' });

        const member = await Member.create({
            community: community._id,
            user: ownerId,
            role: adminRole._id,
        });

        res.status(201).json(
            new ApiResponse(200, {
                data: {
                    community,
                    member,
                },
            },
            "Community created successfully")
        );
    } catch (error) {
        // console.error("Error creating community:", error);
        // console.error("Request body:", req.body);
        // console.error("User ID:", req.user._id);
        if (error.message) {
            console.error("Database error message:", error.message);
        }
        throw new ApiError(403, "Failed to create community");
    }
});
const getAllCommunities=asyncHandler(async(req,res,_)=>{
    /*
        - Get the page number from the request query
        - Get the number of items per page
        - Calculate the number of items to skip
        - Get the communities
        - Get the total number of communities
        - Calculate the total number of pages
        - Return the communities and the total number of pages
        - and the current page number in the response
    */

    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const skip = perPage * (page - 1);

    const [communities, total] = await Promise.all([

        Community.find()
            .populate('owner', 'id name')
            .skip(skip)
            .limit(perPage),
        Community.countDocuments(),

    ]);

    const totalPages = Math.ceil(total / perPage);

    res.status(200)
    .json(
         new ApiResponse(
            200,
                {
                    data: communities,
                    total,
                    pages: totalPages,
                    page,
                },
                "Done"
                 
         )
    );
})

const getAllMembers = asyncHandler(async (req,res,_) => {

    /*
        - Get the page number from the request query
        - Get the community ID from he request  parameters
        - Get the total number of memeber in the community
        - calculate the total number of pages
        - Get the members of the community
        - Return the members and the total number of pages
        - and the current page number in the response
    */
    try {
        const perPage = 10;
        const page = Number(req.query.page) || 1;

        const communityId = req.params.id;

        const totalCount = await Member.countDocuments({ community: communityId });

        const totalPages = Math.ceil(totalCount / perPage);

        const members = await Member.find({ community: communityId })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('user', 'id name')
            .populate('role')
            .lean();

        res.status(200).json(
            new ApiResponse(200, {
                members,
                total: totalCount,
                pages: totalPages,
                page: page,
            },
                "Data fetched successfully"
            )
        );
    } catch (error) {
        console.error("Error fetching members:", error);
        throw new ApiError(500, "Cannot get members");
    }
});

const getMyOwnedCommunity= asyncHandler(async(req,res,_)=>{

    /*
        match user id and Community owner id   
    */

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try{
        const userId = req.user.toObject()._id;

        const count = await Community.countDocuments({ owner: userId });

        const communities = await Community.find({ owner: userId })
            .select('password') // exclude password field from owner object
            .populate({ path: 'owner', select: 'id name' })
            .skip(skip)
            .limit(limit)
        const totalPages = Math.ceil(count / limit);

        const meta = {
            total: count,
            pages: totalPages,
            page: page,
        };

        res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    meta, communities
                },
                "Data fetched successfully"
            )
        )
        
    }catch(error){
        throw ApiError(500,"failed")
    }
})
const getMyJoinedCommunity = asyncHandler(async(req,res,_)=>{
    /*
        - Get the page number from the request query
        - Get the user ID from the request object
        - Query the database for members associated with the user ID
        - Populate related fields: community, user, role
        - Apply pagination based on the page and limit parameters
        - Calculate the total number of documents for pagination
        - Return the fetched members, total count, total pages, and current page number in the response
        - Handle errors by logging and throwing an appropriate API error response
    */
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id;
    try{
        const members = await Member.find({ user: userId })
            .populate({
                path: 'community',
                select: '_id name owner',
                populate: {
                    path: 'owner',
                    select: '_id name',
                },
            })
            .populate({
                path: 'user',
                select: '_id name',
            })
            .populate({
                path: 'role',
                select: '_id name',
            })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        const total = await Member.countDocuments({ user: userId });
        const pages = Math.ceil(total / limit);

        res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    members,
                    total,
                    pages,
                    page: parseInt(page),
                },
                "Data fetched successfully"
            )
        )
    }catch(error){
        console.error(error); 
        throw new ApiError(500,"Internal server error");
    }
})
export {createCommunity,getMyJoinedCommunity,getAllCommunities,getAllMembers,getMyOwnedCommunity}