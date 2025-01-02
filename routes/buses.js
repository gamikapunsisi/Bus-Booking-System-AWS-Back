const express = require('express');
const router = express.Router();
const { getAllBuses, addBus } = require('./controllers/busesController');

// Define routes for buses
router.get('/', getAllBuses); // Get all buses
router.post('/', addBus); // Add a new bus

module.exports = router;
