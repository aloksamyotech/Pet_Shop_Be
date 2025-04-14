import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { companyController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(companyController.company));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(companyController.getCompany));
router.put("/update/:id", asyncHandler(authenticateJWT),asyncHandler(companyController.updateCompany));
router.delete("/:id", asyncHandler(authenticateJWT),asyncHandler(companyController.deleteCompany));
router.get("/count",  asyncHandler(authenticateJWT),asyncHandler(companyController.getCompanyCount));
export default router;