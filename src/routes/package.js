import { packageController } from "../controllers/controllers.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { Router } from "express";
import { packageUpload } from "../core/common/upload_multer.js";

const router = new Router();

router.post(
  "/save",
  packageUpload,
  asyncHandler(packageController.CreatePackage)
);
router.get("/fetch", asyncHandler(packageController.GetPackage));
router.put(
  "/update/:id",
  packageUpload,
  asyncHandler(packageController.updatePackage)
);
router.delete("/:id", asyncHandler(packageController.deletedPackageData));

export default router;
