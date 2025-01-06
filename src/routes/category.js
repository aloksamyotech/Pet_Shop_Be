import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { categoryController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(categoryController.category));
router.get("/fetch", asyncHandler(categoryController.getCategory));
router.put("/update",asyncHandler(categoryController.updateCategory));
router.delete("/:categoryId",asyncHandler(categoryController.deleteCategory));





export default router;
