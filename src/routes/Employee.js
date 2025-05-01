

import { Router } from "express";
import {asyncHandler } from "../utils/asyncWrapper.js";
import { EmployeeController } from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management API
 */

/**
 * @swagger
 * /api/employee/save:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
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
 *               - email
 *               - phoneNumber
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               salary:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.employee));

/**
 * @swagger
 * /api/employee/fetch:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.getEmployee));

/**
 * @swagger
 * /api/employee/update/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               salary:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put("/update/:id",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.updateEmployee));

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Soft delete an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 */
router.delete("/:id",  asyncHandler(authenticateJWT),asyncHandler(EmployeeController.deleteEmployee));

export default router;
