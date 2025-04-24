import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { customerController } from "../controllers/controllers.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * /api/customer/save:
 *   post:
 *     summary: Add a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
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
 *         description: Customer successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/save", asyncHandler(customerController.customer));

/**
 * @swagger
 * /api/customer/fetch:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: A list of customers
 *       403:
 *         description: Forbidden
 */
router.get("/fetch", asyncHandler(customerController.getCustomer));

/**
 * @swagger
 * /api/customer/update/{id}:
 *   put:
 *     summary: Update an existing customer by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
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
 *         description: Customer successfully updated
 *       400:
 *         description: Invalid input
 */
router.put("/update/:id", asyncHandler(customerController.updateCustomers));

/**
 * @swagger
 * /api/customer/delete/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to delete
 *     responses:
 *       200:
 *         description: Customer successfully deleted
 *       404:
 *         description: Customer not found
 */
router.delete("/:id", asyncHandler(customerController.deleteCustomers));

/**
 * @swagger
 * /api/customer/count:
 *   get:
 *     summary: Get the total count of customers
 *     responses:
 *       200:
 *         description: The total count of customers
 *       403:
 *         description: Forbidden
 */
router.get("/count", asyncHandler(customerController.getCustomerCount));

export default router;
