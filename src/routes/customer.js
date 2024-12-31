import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { customerController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(customerController.customer));


router.get("/fetch", asyncHandler(customerController.getCustomer));

router.put("/updated",asyncHandler(customerController.updateCustomers));

router.delete("/:customerId",asyncHandler(customerController.deleteCustomers));

export default router;
