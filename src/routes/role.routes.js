import { Router } from "express";
import {createRole, getAllRole} from "../controller/role.controller.js"
const router = Router();

router.route("/createRole").post(createRole)
router.route("/getAllRole").get(getAllRole);

export default router;