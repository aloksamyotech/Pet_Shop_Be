import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productController} from "../controllers/controllers.js";
import { upload } from "../core/common/upload_multer.js";

const router = Router();
router.post("/save", upload,asyncHandler(productController.product));
router.get("/fetch", asyncHandler(productController.getProducts));
router.put("/update/:id", upload,asyncHandler(productController.updateProducts));
router.delete("/:id",asyncHandler(productController.deleteProducts));
router.post("/bulkUpload", asyncHandler(productController.products));
router.get("/count", asyncHandler(productController.totalProducts));

export default router;