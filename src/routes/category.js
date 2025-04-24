import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { categoryController } from "../controllers/controllers.js";
import { categoryUpload } from "../core/common/upload_multer.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * /api/category/save:
 *   post:
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryImage:
 *                 type: string
 *                 format: binary
 *               SubcategoryId:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       201:
 *         description: Category successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/save", categoryUpload, asyncHandler(categoryController.category));

/**
 * @swagger
 * /api/category/fetch:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 *       403:
 *         description: Forbidden
 */
router.get("/fetch", asyncHandler(categoryController.getCategory));

/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update an existing category by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryImage:
 *                 type: string
 *                 format: binary
 *               SubcategoryId:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       200:
 *         description: Category successfully updated
 *       400:
 *         description: Invalid input
 */
router.put("/update/:id", asyncHandler(categoryController.updateCategory));

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *       404:
 *         description: Category not found
 */
router.delete("/:id", asyncHandler(categoryController.deleteCategory));

export default router;
