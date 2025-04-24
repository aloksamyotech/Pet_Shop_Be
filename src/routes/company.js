import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { companyController } from "../controllers/controllers.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * /api/company/save:
 *   post:
 *     summary: Add a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive, Blocked]
 *               isDelete:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Company successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/save",  asyncHandler(companyController.company));

/**
 * @swagger
 * /api/company/fetch:
 *   get:
 *     summary: Get all companies
 *     responses:
 *       200:
 *         description: A list of companies
 *       403:
 *         description: Forbidden
 */
router.get("/fetch",  asyncHandler(companyController.getCompany));

/**
 * @swagger
 * /api/company/update/{id}:
 *   put:
 *     summary: Update an existing company by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive, Blocked]
 *               isDelete:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Company successfully updated
 *       400:
 *         description: Invalid input
 */
router.put("/update/:id",  asyncHandler(companyController.updateCompany));

/**
 * @swagger
 * /api/company/delete/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to delete
 *     responses:
 *       200:
 *         description: Company successfully deleted
 *       404:
 *         description: Company not found
 */
router.delete("/:id",  asyncHandler(companyController.deleteCompany));

/**
 * @swagger
 * /api/company/count:
 *   get:
 *     summary: Get the total count of companies
 *     responses:
 *       200:
 *         description: The total count of companies
 *       403:
 *         description: Forbidden
 */
router.get("/count",  asyncHandler(companyController.getCompanyCount));

export default router;
