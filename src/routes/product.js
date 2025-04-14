import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productController} from "../controllers/controllers.js";
import { upload } from "../core/common/upload_multer.js";
import {authenticateJWT} from "../middlewares/Auto.js"
const router = Router();
router.post("/save",  asyncHandler(authenticateJWT),upload,asyncHandler(productController.product));
router.get("/fetch", 
    asyncHandler(authenticateJWT),
    asyncHandler(productController.getProducts));
router.put("/update/:id", asyncHandler(authenticateJWT),upload,asyncHandler(productController.updateProducts));
router.delete("/:id",asyncHandler(authenticateJWT),asyncHandler(productController.deleteProducts));
router.post("/bulkUpload", asyncHandler(authenticateJWT), asyncHandler(productController.products));
router.get("/count", asyncHandler(authenticateJWT),asyncHandler(productController.totalProducts));

export default router;