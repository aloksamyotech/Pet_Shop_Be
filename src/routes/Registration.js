import { registrationController } from '../controllers/controllers.js';
import { Router } from 'express';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { authenticateJWT } from '../middlewares/Auto.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Customer Pet Service Registration Management
 */

/**
 * @swagger
 * /api/registration/save:
 *   post:
 *     summary: Register a new customer with pet details
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - email
 *               - breed
 *               - petAge
 *               - city
 *               - service
 *               - size
 *             properties:
 *               Name:
 *                 type: string
 *               phone:
 *                 type: number
 *               email:
 *                 type: string
 *               petType:
 *                 type: string
 *                 enum: [cat, dogs, small pet]
 *               breed:
 *                 type: string
 *               genderPet:
 *                 type: string
 *                 enum: [male, female]
 *               petAge:
 *                 type: number
 *               city:
 *                 type: string
 *               service:
 *                 type: string
 *                 enum: [self, staff]
 *               size:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Registration created successfully
 */
router.post('/save', asyncHandler(registrationController.registrationUserData));

/**
 * @swagger
 * /api/registration/fetch:
 *   get:
 *     summary: Fetch all registrations
 *     tags: [Registration]
 *     responses:
 *       200:
 *         description: List of all registrations
 */
router.get('/fetch', asyncHandler(registrationController.registrationUserFetch));

/**
 * @swagger
 * /api/registration/update/{id}:
 *   put:
 *     summary: Update registration by ID
 *     tags: [Registration]
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
 *               city:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, approved]
 *     responses:
 *       200:
 *         description: Registration updated
 */
router.put('/update/:id', asyncHandler(registrationController.registrationUpdated));

/**
 * @swagger
 * /api/registration/{id}:
 *   delete:
 *     summary: Delete registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 */
router.delete('/:id', asyncHandler(registrationController.registrationDelete));

/**
 * @swagger
 * /api/registration/{id}:
 *   put:
 *     summary: Update only the status of a registration
 *     tags: [Registration]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved]
 *     responses:
 *       200:
 *         description: Status updated
 */


router.put('/:id', asyncHandler(registrationController.UpdatedStatus));
router.get('/status',asyncHandler(registrationController.bookingStatus))
router.get('/todayBooking', asyncHandler(registrationController.bookingTodayData));
router.get('/emailSend/:id',asyncHandler(registrationController.UserEmail));
router.get('/:id', asyncHandler(registrationController.UserFind));



export default router;
