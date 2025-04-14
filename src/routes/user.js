import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { logoUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";
import { userController } from "../controllers/controllers.js";
const router = Router();


router.post("/register", asyncHandler(authenticateJWT), logoUpload, asyncHandler(userController.userRegistration));
router.post("/login", asyncHandler(userController.userLogin));
router.put("/update/:id", asyncHandler(authenticateJWT),asyncHandler(userController.updateUserController));
router.put("/updatePassword/:id", asyncHandler(authenticateJWT), asyncHandler(userController.updatePassword))
router.put("/updateCurrency/:id", asyncHandler(authenticateJWT), asyncHandler(userController.updateCurrencyData))
router.put("/updatelogo/:id", asyncHandler(authenticateJWT), logoUpload, asyncHandler(userController.updateLogoData));
router.get("/fetch", asyncHandler(authenticateJWT), asyncHandler(userController.getUser));

export default router;
