import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { categoryController} from "../controllers/controllers.js";
import { categoryUpload } from "../core/common/upload_multer.js";

const router = Router();

router.post("/save",categoryUpload,asyncHandler(categoryController.category));
router.get("/fetch", asyncHandler(categoryController.getCategory));
router.put("/update/:id",asyncHandler(categoryController.updateCategory));
router.delete("/:id",asyncHandler(categoryController.deleteCategory));

export default router;
