import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { purchaseController } from "../controllers/controllers.js";
import { purchaseUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: Purchase management
 */

/**
 * @swagger
 * /api/purchase/save:
 *   post:
 *     summary: Add a new purchase
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - price
 *               - totalPrice
 *               - quantity
 *               - companyId
 *             properties:
 *               productId:
 *                 type: string
 *               price:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               quantity:
 *                 type: number
 *               paymentStatus:
 *                 type: string
 *                 enum: [Pending, Success, Failed]
 *               companyId:
 *                 type: string
 *               PurchaseImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Purchase created successfully
 */
router.post("/save", purchaseUpload, asyncHandler(purchaseController.purchase));

/**
 * @swagger
 * /api/purchase/fetch:
 *   get:
 *     summary: Fetch all purchases
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchases fetched successfully
 */
router.get("/fetch", asyncHandler(purchaseController.getPurchases));

/**
 * @swagger
 * /api/purchase/update/{id}:
 *   put:
 *     summary: Update purchase by ID
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               quantity:
 *                 type: number
 *               paymentStatus:
 *                 type: string
 *                 enum: [Pending, Success, Failed]
 *               PurchaseImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Purchase updated successfully
 */
router.put("/update/:id", purchaseUpload, asyncHandler(purchaseController.updatePurchases));

/**
 * @swagger
 * /api/purchase/{id}:
 *   delete:
 *     summary: Delete purchase by ID
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase deleted successfully
 */
router.delete("/:id", asyncHandler(purchaseController.deletePurchases));

export default router;
