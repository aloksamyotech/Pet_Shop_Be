import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { orderController } from "../controllers/controllers.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

/**
 * @swagger
 * /api/order/save:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - totalAmount
 *               - customerId
 *               - customerName
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               customerId:
 *                 type: string
 *               customerName:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerPhone:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/save", asyncHandler(orderController.order));

/**
 * @swagger
 * /api/order/fetch:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get("/fetch", asyncHandler(orderController.getOrders));

/**
 * @swagger
 * /api/order/updated:
 *   put:
 *     summary: Update an existing order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order updated
 */
router.put("/updated", asyncHandler(orderController.updateOrders));

/**
 * @swagger
 * /api/order/{orderId}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete("/:orderId", asyncHandler(orderController.deleteOrders));

/**
 * @swagger
 * /api/order/count:
 *   get:
 *     summary: Get total number of orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order count retrieved
 */
router.get("/count", asyncHandler(orderController.getOrderCount));

/**
 * @swagger
 * /api/order/totalSales:
 *   get:
 *     summary: Get monthly total sales report
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales data
 */
router.get("/totalSales", asyncHandler(orderController.getMonthlySalesReport));

/**
 * @swagger
 * /api/order/totalQuantity:
 *   get:
 *     summary: Get total quantity of products sold
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total quantity
 */
router.get("/totalQuantity", asyncHandler(orderController.getTotalQuantity));

export default router;
