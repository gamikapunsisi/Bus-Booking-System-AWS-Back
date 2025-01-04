const express = require('express');
const router = express.Router();
const busRouteController = require('../controllers/busRouteController');
const busBookController = require('../controllers/busBookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of buses retrieved successfully
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busNumber
 *               - capacity
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       401:
 *         description: Unauthorized
 *
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus details retrieved successfully
 *       404:
 *         description: Bus not found
 *
 *   put:
 *     summary: Update bus by ID
 *     tags: [Buses]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 *
 *   delete:
 *     summary: Delete bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 */

// Public routes
router.get('/routes', busRouteController.listRoutes);
router.get('/routes/:routeName/stops', busRouteController.getRouteStops);

// Protected routes that require admin access
router.get('/trips', authenticateToken, adminMiddleware, busBookController.getTripsController);
router.get('/trips/:id', authenticateToken, adminMiddleware, busBookController.getTripByIdController);
router.post('/trip/create', authenticateToken, adminMiddleware, busBookController.createTripController);
router.put('/trips/:id', authenticateToken, adminMiddleware, busBookController.updateTripController);
router.delete('/trips/:id', authenticateToken, adminMiddleware, busBookController.deleteTripController);

// Protected routes for all authenticated users
router.post('/route/get', authenticateToken, busBookController.getTripController);
router.post('/routes', 
    authenticateToken, 
    authorizeRoles('ADMIN', 'BUS_OPERATOR'), 
    busRouteController.addRoute
);
router.post('/trip/book', authenticateToken, busBookController.bookSeatsController);
router.get('/trips/:tripId/seats', 
    authenticateToken, 
    busBookController.getBookedSeatsController
);

module.exports = router;
