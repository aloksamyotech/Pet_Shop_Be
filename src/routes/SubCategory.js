import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { SubCategoryController } from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: Product SubCategory Management
 */

/**
 * @swagger
 * /api/subcategory/save:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 */
router.post("/save",   asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.category));

/**
 * @swagger
 * /api/subcategory/fetch:
 *   get:
 *     summary: Fetch all subcategories
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get("/fetch",   asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.getCategory));

/**
 * @swagger
 * /api/subcategory/update/{id}:
 *   put:
 *     summary: Update subcategory by ID
 *     tags: [SubCategory]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 */
router.put("/update/:id",   asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.updateCategory));

/**
 * @swagger
 * /api/subcategory/{id}:
 *   delete:
 *     summary: Delete subcategory by ID
 *     tags: [SubCategory]
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
 *         description: Subcategory deleted successfully
 */
router.delete("/:id",   asyncHandler(authenticateJWT),asyncHandler(SubCategoryController.deleteCategory));

export default router;
