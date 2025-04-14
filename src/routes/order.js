import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { orderController} from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(orderController.order));
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(orderController.getOrders));
router.put("/updated", asyncHandler(authenticateJWT),asyncHandler(orderController.updateOrders));
router.delete("/:orderId", asyncHandler(authenticateJWT),asyncHandler(orderController.deleteOrders));
router.get('/count',  asyncHandler(authenticateJWT),asyncHandler(orderController.getOrderCount));
router.get('/totalSales',  asyncHandler(authenticateJWT),asyncHandler(orderController.getMonthlySalesReport));
router.get('/totalQuantity',  asyncHandler(authenticateJWT),asyncHandler(orderController.getTotalQuantity));

export default router;