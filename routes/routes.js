const express = require('express');
const { getAllRoutes, addRoute, updateRoute, deleteRoute } = require('../controllers/routesController');
const router = express.Router();

// Get all routes
router.get('/', getAllRoutes);

// Add a new route
router.post('/', addRoute);

// Update a route
router.put('/:routeId', updateRoute);

// Delete a route
router.delete('/:routeId', deleteRoute);

module.exports = router;
