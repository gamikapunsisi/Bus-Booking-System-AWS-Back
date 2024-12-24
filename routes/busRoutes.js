// routes/busRoutes.js
const express = require('express');
const busRouteController = require('../controllers/busesController');
const router = express.Router();

// GET: Fetch all bus routes
router.get('/', busRouteController.getAllBusRoutes);

// GET: Fetch a specific bus route by ID
router.get('/:id', busRouteController.getBusRouteById);

// POST: Create a new bus route
router.post('/', busRouteController.createBusRoute);

// PUT: Update an existing bus route by ID
router.put('/:id', busRouteController.updateBusRoute);

// PATCH: Partially update bus route details
router.patch('/:id', busRouteController.updateBusRoutePartially);

// DELETE: Delete a bus route by ID
router.delete('/:id', busRouteController.deleteBusRoute);

module.exports = router;
