import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { SubCategoryController} from "../controllers/controllers.js";
const router = Router();

router.post("/save",asyncHandler(SubCategoryController.category));
router.get("/fetch", asyncHandler(SubCategoryController.getCategory));
router.put("/update/:id",asyncHandler(SubCategoryController.updateCategory));
router.delete("/:id",asyncHandler(SubCategoryController.deleteCategory));



export default router;
