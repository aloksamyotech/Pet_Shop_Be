import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { productController } from "../controllers/controllers.js";
import { upload } from "../core/common/upload_multer.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/save:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - originalPrice
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               SubCategoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               quantity:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/save",  upload, asyncHandler(productController.product));

/**
 * @swagger
 * /api/product/fetch:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/fetch",  asyncHandler(productController.getProducts));

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               SubCategoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               quantity:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/update/:id",  upload, asyncHandler(productController.updateProducts));

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
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
 *         description: Product deleted successfully
 */
router.delete("/:id",  asyncHandler(productController.deleteProducts));

/**
 * @swagger
 * /api/product/bulkUpload:
 *   post:
 *     summary: Upload multiple products in bulk
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                 price:
 *                   type: number
 *                 originalPrice:
 *                   type: number
 *                 discount:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *                 SubCategoryId:
 *                   type: string
 *                 categoryName:
 *                   type: string
 *                 quantity:
 *                   type: number
 *     responses:
 *       201:
 *         description: Products uploaded successfully
 */
router.post("/bulkUpload",  asyncHandler(productController.products));

/**
 * @swagger
 * /api/product/count:
 *   get:
 *     summary: Get total number of products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total product count
 */
router.get("/count",  asyncHandler(productController.totalProducts));

export default router;
