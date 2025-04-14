import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { purchaseController} from "../controllers/controllers.js";
import { purchaseUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save", asyncHandler(authenticateJWT),purchaseUpload, asyncHandler(purchaseController.purchase));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(purchaseController.getPurchases));
router.put("/update/:id", asyncHandler(authenticateJWT),purchaseUpload,asyncHandler(purchaseController.updatePurchases));
router.delete("/:id", asyncHandler(authenticateJWT),asyncHandler(purchaseController.deletePurchases));

export default router;
