const express = require('express');
const { getAllBuses, addBus, updateBus, deleteBus } = require('../controllers/busesController');
const router = express.Router();

// Get all buses
router.get('/', getAllBuses);

// Add a new bus
router.post('/', addBus);

// Update a bus
router.put('/:busId', updateBus);

// Delete a bus
router.delete('/:busId', deleteBus);

module.exports = router;
