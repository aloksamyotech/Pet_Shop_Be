import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { categoryController} from "../controllers/controllers.js";
import { categoryUpload } from "../core/common/upload_multer.js";

const router = Router();


router.post("/save",categoryUpload,asyncHandler(categoryController.category));
router.get("/fetch", asyncHandler(categoryController.getCategory));
router.put("/update",asyncHandler(categoryController.updateCategory));
router.delete("/:categoryId",asyncHandler(categoryController.deleteCategory));
router.post("/bulkUpload", asyncHandler(categoryController.categoryBulkController));





export default router;
