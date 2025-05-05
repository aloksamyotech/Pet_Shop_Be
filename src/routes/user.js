import { Router } from "express";
import {  asyncHandler } from "../utils/asyncWrapper.js";
import { logoUpload } from "../core/common/upload_multer.js";
import { authenticateJWT } from "../middlewares/Auto.js";
import { userController } from "../controllers/controllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Authentication and Profile Management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *               company:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *               logoImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register",  logoUpload,  asyncHandler(authenticateJWT),asyncHandler(userController.userRegistration));

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login",asyncHandler(userController.userLogin));

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/update/:id",   asyncHandler(authenticateJWT),asyncHandler(userController.updateUserController));

/**
 * @swagger
 * /api/user/updatePassword/{id}:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.put("/updatePassword/:id",   asyncHandler(authenticateJWT),asyncHandler(userController.updatePassword));

/**
 * @swagger
 * /api/user/updateCurrency/{id}:
 *   put:
 *     summary: Update user currency info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currencyCode:
 *                 type: string
 *               currencySymbol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Currency info updated
 */
router.put("/updateCurrency/:id",   asyncHandler(authenticateJWT),asyncHandler(userController.updateCurrencyData));

/**
 * @swagger
 * /api/user/updatelogo/{id}:
 *   put:
 *     summary: Update user logo
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
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
 *               logoImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo updated successfully
 */
router.put("/updatelogo/:id",  logoUpload,  asyncHandler(authenticateJWT),asyncHandler(userController.updateLogoData));

/**
 * @swagger
 * /api/user/fetch:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 */
router.get("/fetch",   asyncHandler(authenticateJWT),asyncHandler(userController.getUser));

export default router;
