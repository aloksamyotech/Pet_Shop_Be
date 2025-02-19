import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { ProfileController} from "../controllers/controllers.js";


const router = Router();
router.post("/save",asyncHandler(    ProfileController.profile));
router.get("/fetch", asyncHandler(    ProfileController.getProfile));



export default router;
