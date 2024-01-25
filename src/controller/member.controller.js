import { Role } from "../model/role.model.js";
import { Member } from "../model/member.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {hasRole} from "../service/member.service.js";


const addMember = asyncHandler(async (req, res) => {
    try {
        const { community, user, role } = req.body;
        const adminRole = await Role.findOne({ name: 'Community Admin' });

        if (!(await hasRole(community, req.user.toObject()._id, adminRole))) {
            throw new ApiError(403, "Not allowed access");
        }

        const newMember = await Member.create({
            community,
            user,
            role: role,
        });
        res.status(201).json(
            new ApiResponse(
                200,
                newMember,
                "Member added successfully"
            )
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Adding member failed");
    }
});


const deleteMember=asyncHandler(async(req,res)=>{
    try{
        const moderatorRole = await Role.findOne({ name: 'Community Moderator' });
        const adminRole = await Role.findOne({ name: 'Community Admin' });

        if (! await hasRole(req.params.cid, req.user.toObject() ._id, adminRole) &&
        ! await hasRole(req.params.cid, req.user.toObject() ._id, moderatorRole)) {
            return res.status(403).json({ message: 'Not allowed access' });
        }
        const member = await Member.findById(req.params.id).populate('community');
        await member.remove();

        return res.status(201)
        .json(new ApiResponse(201,{},"Member removed successfully."));
    } catch (err) {

        throw ApiError(500,"Fail deleting member")
    }
})

export {addMember,deleteMember}