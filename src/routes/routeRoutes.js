/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of routes retrieved successfully
 *
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startLocation
 *               - endLocation
 *               - distance
 *               - estimatedDuration
 *             properties:
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               distance:
 *                 type: number
 *               estimatedDuration:
 *                 type: number
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Route created successfully
 *
 * /api/routes/{id}:
 *   get:
 *     summary: Get route by ID
 *     tags: [Routes]
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
 *         description: Route details retrieved successfully
 *       404:
 *         description: Route not found
 *
 *   put:
 *     summary: Update route by ID
 *     tags: [Routes]
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
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               distance:
 *                 type: number
 *               estimatedDuration:
 *                 type: number
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 *
 *   delete:
 *     summary: Delete route by ID
 *     tags: [Routes]
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
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 */ 

const express = require('express');
const router = express.Router();
const { addRoute } = require('../controllers/busRouteController');

// Add this route
router.post('/api/bus/routes', addRoute);

// ... other routes ...

module.exports = router; 