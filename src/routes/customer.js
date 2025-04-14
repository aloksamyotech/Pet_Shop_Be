import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {customerController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(customerController.customer));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(customerController.getCustomer));
router.put("/update/:id",  asyncHandler(authenticateJWT),asyncHandler(customerController.updateCustomers));
router.delete("/:id",  asyncHandler(authenticateJWT),asyncHandler(customerController.deleteCustomers));
router.get("/count",  asyncHandler(authenticateJWT),asyncHandler(customerController.getCustomerCount));

export default router;