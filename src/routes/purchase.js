import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { purchaseController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(purchaseController.purchase));


router.get("/fetch", asyncHandler(purchaseController.getPurchases));

router.put("/updated",asyncHandler(purchaseController.updatePurchases));

router.delete("/:purchaseId",asyncHandler(purchaseController.deletePurchases));





export default router;
