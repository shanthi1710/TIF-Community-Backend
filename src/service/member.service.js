import {Member} from "../model/member.model.js";

async function hasRole(communityId, userId, roleId) {
    const hasRole = await Member.findOne({
        community: communityId,
        user: userId,
        role: roleId
    });
    return hasRole;
}

export { hasRole }

