import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { ProfileController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";


const router = Router();
router.post("/save", asyncHandler(authenticateJWT),asyncHandler(ProfileController.profile));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(ProfileController.getProfile));



export default router;
