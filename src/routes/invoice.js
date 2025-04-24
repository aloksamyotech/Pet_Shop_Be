import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController } from "../controllers/controllers.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * /api/invoice/fetch:
 *   get:
 *     summary: Get all invoices
 *     tags:
 *       - Invoice
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all invoices
 *       403:
 *         description: Forbidden
 */
router.get("/fetch",  asyncHandler(invoiceController.invoiceGet));

/**
 * @swagger
 * /api/invoice/save:
 *   post:
 *     summary: Create a new invoice
 *     tags:
 *       - Invoice
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - customerId
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: MongoDB ObjectId of the order
 *               customerId:
 *                 type: string
 *                 description: MongoDB ObjectId of the customer
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */
router.post("/save",  asyncHandler(invoiceController.invoice));

export default router;
