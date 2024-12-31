import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { companyController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(companyController.company));


router.get("/fetch", asyncHandler(companyController.getCompany));

router.put("/updated",asyncHandler(companyController.updateCompany));

router.delete("/:companyId",asyncHandler(companyController.deleteCompany));

export default router;
