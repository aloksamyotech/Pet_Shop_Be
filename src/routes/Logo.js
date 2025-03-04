import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { LogoController} from "../controllers/controllers.js";
import { logoUpload } from "../core/common/upload_multer.js";

const router = Router();

router.post("/save",logoUpload,asyncHandler(LogoController.logo));
router.put("/update/:id", logoUpload, asyncHandler(LogoController.updateLogoData));
router.get("/fetch", logoUpload, asyncHandler(LogoController.getLogo));




export default router;
