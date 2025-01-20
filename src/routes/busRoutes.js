const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    registerBus, getBusById, getBusByRouteId, getAllBuses
} = require('../controllers/busController');

router.post('/', authenticateToken, registerBus);
router.get('/', authenticateToken, getAllBuses);
router.get('/route/:routeId', authenticateToken, getBusByRouteId);
router.get('/:busId', authenticateToken, getBusById);

module.exports = router;