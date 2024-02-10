import { Role } from "../model/role.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRole = asyncHandler(async (req, res) => {
 /*
    - req.body -name
    - save data to database
 */
    const { name } = req.body;

    const role = new Role({
        name
    });

    await role.save();
    return res
        .status(201)
        .json(
            new ApiResponse(201, { name: role.name }, "user role assigned successfully")
        );
});

const getAllRole = asyncHandler(async (req, res) => {

    /*
        - get all roles from database using -Role.find()
        - return the roles
    */
    const { page = 1, limit = 10 } = req.query;

    const total = await Role.countDocuments();

    const pages = Math.ceil(total / limit);  
    const currentPage = parseInt(page);

    const roles = await Role.find()
        .skip((currentPage - 1) * limit) 
        .limit(parseInt(limit));

    res
        .status(201)
        .json(
            new ApiResponse(201, {
                data: roles,
                meta: {
                    total,
                    pages,
                    page: currentPage,
                },
            },
            "Get All role"
            )
        );
});

export { createRole, getAllRole };
