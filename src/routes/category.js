import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { categoryController} from "../controllers/controllers.js";
import { categoryUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

router.post("/save", asyncHandler(authenticateJWT),categoryUpload,asyncHandler(categoryController.category));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(categoryController.getCategory));
router.put("/update/:id", asyncHandler(authenticateJWT),asyncHandler(categoryController.updateCategory));
router.delete("/:id", asyncHandler(authenticateJWT),asyncHandler(categoryController.deleteCategory));



export default router;
