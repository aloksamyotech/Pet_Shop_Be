import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { EmployeeController } from "../controllers/controllers.js";

const router = Router();
router.post("/save", asyncHandler(EmployeeController.employee));
router.get("/fetch", asyncHandler(EmployeeController.getEmployee));
router.put("/update/:id", asyncHandler(EmployeeController.updateEmployee));
router.delete("/:id", asyncHandler(EmployeeController.deleteEmployee));


export default router;