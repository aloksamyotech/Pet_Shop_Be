import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { EmployeeController } from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.employee));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.getEmployee));
router.put("/update/:id",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.updateEmployee));
router.delete("/:id",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.deleteEmployee));


export default router;