import { packageController } from "../controllers/controllers.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { Router } from "express";



const router = new Router();

router.post('/save',asyncHandler(packageController.CreatePackage));
router.get('/fetch',asyncHandler(packageController.GetPackage));
router.put('/update/:id',asyncHandler(packageController.updatePackage));
router.delete('/:id',asyncHandler(packageController.deletedPackageData));

export default router;

