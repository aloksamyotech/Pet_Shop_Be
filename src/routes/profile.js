import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { ProfileController } from "../controllers/controllers.js";
import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management
 */

/**
 * @swagger
 * /api/profile/save:
 *   post:
 *     summary: Create or update profile
 *     tags: [Profile]
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
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created or updated successfully
 */
router.post("/save",  asyncHandler(authenticateJWT),asyncHandler(ProfileController.profile));

/**
 * @swagger
 * /api/profile/fetch:
 *   get:
 *     summary: Get profile data
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data fetched successfully
 */
router.get("/fetch",  asyncHandler(authenticateJWT),asyncHandler(ProfileController.getProfile));

export default router;
