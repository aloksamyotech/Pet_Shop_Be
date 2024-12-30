import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(productController.product));


router.get("/fetch", asyncHandler(productController.getProducts));

router.put("/updated",asyncHandler(productController.updateProducts));

router.delete("/:productId",asyncHandler(productController.deleteProducts));





export default router;
