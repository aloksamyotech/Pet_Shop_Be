import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { EmailController} from "../controllers/controllers.js";


const router = Router();
router.get("/fetch", asyncHandler(EmailController.fetchEmailSettings));
router.put("/update",asyncHandler(EmailController.modifyEmailSettings));

export default router;

