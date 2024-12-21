const express = require('express');
const { getAllRoutes, addRoute } = require('../controllers/routesController');
const router = express.Router();

// Get all routes
router.get('/', getAllRoutes);

// Add a new route
router.post('/', addRoute);

module.exports = router;
