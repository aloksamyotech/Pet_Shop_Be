import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { LogoController} from "../controllers/controllers.js";
import { logoUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

router.post("/save", asyncHandler(authenticateJWT),logoUpload,asyncHandler(LogoController.logo));
router.put("/update/:id",  asyncHandler(authenticateJWT),logoUpload, asyncHandler(LogoController.updateLogoData));
router.get("/fetch",  asyncHandler(authenticateJWT),logoUpload, asyncHandler(LogoController.getLogo));




export default router;
