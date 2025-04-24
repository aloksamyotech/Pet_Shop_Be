import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { EmailController } from "../controllers/controllers.js";
// import { authenticateJWT } from "../middlewares/Auto.js";

const router = Router();

/**
 * @swagger
 * /api/settings/fetch:
 *   get:
 *     summary: Get current email settings
 *     responses:
 *       200:
 *         description: A list of current email settings
 *       403:
 *         description: Forbidden
 */
router.get("/fetch", asyncHandler(EmailController.fetchEmailSettings));

/**
 * @swagger
 * /api/settings/update:
 *   put:
 *     summary: Update email settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: boolean
 *               order:
 *                 type: boolean
 *               customerAdd:
 *                 type: boolean
 *               purchase:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Email settings successfully updated
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */
router.put("/update", asyncHandler(EmailController.modifyEmailSettings));

export default router;
