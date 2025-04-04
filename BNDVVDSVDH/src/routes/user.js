import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { logoUpload } from "../core/common/upload_multer.js";
const router = Router();

import { userController } from "../controllers/controllers.js";
router.post("/register", logoUpload, asyncHandler(userController.userRegistration));
router.post("/login", asyncHandler(userController.userLogin));
router.put("/update/:id",asyncHandler(userController.updateUserController));
router.put("/updatePassword/:id", asyncHandler(userController.updatePassword))
router.put("/updateCurrency/:id", asyncHandler(userController.updateCurrencyData))
router.put("/updatelogo/:id", logoUpload, asyncHandler(userController.updateLogoData));
router.get("/fetch", asyncHandler(userController.getUser));

export default router;
