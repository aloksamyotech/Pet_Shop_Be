import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productController} from "../controllers/controllers.js";
import { upload } from "../core/common/upload_multer.js";

const router = Router();

router.post("/save",upload, asyncHandler(productController.product));
router.get("/fetch", asyncHandler(productController.getProducts));
router.put("/updated",asyncHandler(productController.updateProducts));
router.delete("/:productId",asyncHandler(productController.deleteProducts));
router.post("/bulkUpload", asyncHandler(productController.products));







export default router;
