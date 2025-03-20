import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { purchaseController} from "../controllers/controllers.js";
import { purchaseUpload } from "../core/common/upload_multer.js";

const router = Router();
router.post("/save",purchaseUpload, asyncHandler(purchaseController.purchase));
router.get("/fetch", asyncHandler(purchaseController.getPurchases));
router.put("/update/:id",asyncHandler(purchaseController.updatePurchases));
router.delete("/:id",asyncHandler(purchaseController.deletePurchases));

export default router;
