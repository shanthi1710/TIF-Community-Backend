import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";


import {createCommunity,getMyJoinedCommunity,getAllCommunities,getAllMembers,getMyOwnedCommunity} from "../controller/community.controller.js";

const router = Router();

router.route("/cCommunity").post(verifyJWT,createCommunity);
router.route("/gaCommunity").get(verifyJWT,getAllCommunities);
router.route("/me/owner").get(verifyJWT,getMyOwnedCommunity);
router.route("/me/member").get(verifyJWT,getMyJoinedCommunity);
router.route("/:id/member").get(verifyJWT,getAllMembers);

export default router;