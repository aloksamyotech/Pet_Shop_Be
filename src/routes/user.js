import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

import { userController } from "../controllers/controllers.js";
router.post("/register", asyncHandler(userController.userRegistration));
router.post("/login", asyncHandler(userController.userLogin));
router.put("/update/:id",asyncHandler(userController.updateUserController));

export default router;
