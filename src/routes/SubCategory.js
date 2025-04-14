import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { SubCategoryController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";
const router = Router();

router.post("/save", asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.category));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.getCategory));
router.put("/update/:id", asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.updateCategory));
router.delete("/:id", asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.deleteCategory));



export default router;
