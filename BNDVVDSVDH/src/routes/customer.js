import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {customerController} from "../controllers/controllers.js";

const router = Router();
router.post("/save", asyncHandler(customerController.customer));
router.get("/fetch", asyncHandler(customerController.getCustomer));
router.put("/update/:id", asyncHandler(customerController.updateCustomers));
router.delete("/:id", asyncHandler(customerController.deleteCustomers));
router.get("/count", asyncHandler(customerController.getCustomerCount));

export default router;