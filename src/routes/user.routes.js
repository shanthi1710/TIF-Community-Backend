import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router();

import {registerUser,loginUser,logoutUser,getMe} from "../controller/auth.controller.js"

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getMe").get(verifyJWT,getMe)


export default router;