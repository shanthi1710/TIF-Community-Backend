import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {addMember,deleteMember} from "../controller/member.controller.js"
const router = Router();

router.route("/addMember").post(verifyJWT,addMember);
router.route("/:id/community/:communityid").delete(verifyJWT,deleteMember);


export default router;