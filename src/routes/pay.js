import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save", asyncHandler(authenticateJWT), asyncHandler(invoiceController.invoice));
export default router