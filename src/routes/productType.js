import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productTypeController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(productTypeController.product));


router.get("/fetch", asyncHandler(productTypeController.getProducts));

router.put("/updated",asyncHandler(productTypeController.updateProducts));

router.delete("/:productId",asyncHandler(productTypeController.deleteProducts));

export default router;
