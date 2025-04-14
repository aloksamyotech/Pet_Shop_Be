import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { EmailController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";


const router = Router();
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(EmailController.fetchEmailSettings));
router.put("/update", asyncHandler(authenticateJWT),asyncHandler(EmailController.modifyEmailSettings));

export default router;

