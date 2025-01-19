const express = require('express');
const router = express.Router();
const {
    authenticateToken
} = require('../middleware/authMiddleware');
const {
    getTripsController,
    createTripController,
    getTripByBusRoute
} = require('../controllers/tripController');

router.get('/', authenticateToken, getTripsController); 
router.post('/', authenticateToken, createTripController);
router.get('/route/:busRoute', authenticateToken, getTripByBusRoute);

module.exports = router;