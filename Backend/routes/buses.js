const express = require('express');
const router = express.Router();

// Import BusController methods
const { getAllBuses, addBus, updateBus, deleteBus } = require('../controllers/busesController');

// Get all buses
router.get('/', getAllBuses);

// Add a new bus
router.post('/', addBus);

// Update a bus by ID
router.put('/:busId', updateBus);

// Delete a bus by ID
router.delete('/:busId', deleteBus);

module.exports = router;
