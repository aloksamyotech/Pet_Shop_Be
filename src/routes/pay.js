import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(invoiceController.invoice));

export default router