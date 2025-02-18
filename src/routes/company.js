import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { companyController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(companyController.company));
router.get("/fetch", asyncHandler(companyController.getCompany));
router.put("/update/:id",asyncHandler(companyController.updateCompany));
router.delete("/:id",asyncHandler(companyController.deleteCompany));
router.get("/count", asyncHandler(companyController.getCompanyCount));



export default router;