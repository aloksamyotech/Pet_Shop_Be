import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { orderController} from "../controllers/controllers.js";

const router = Router();


router.post("/save", asyncHandler(orderController.order));
router.get("/fetch", asyncHandler(orderController.getOrders));
router.put("/updated",asyncHandler(orderController.updateOrders));
router.delete("/:orderId",asyncHandler(orderController.deleteOrders));
router.get('/count', asyncHandler(orderController.getOrderCount));


export default router;
