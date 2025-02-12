// src/routes/index.js
const express = require('express');
const router = express.Router();
const bookingRoutes = require('./bookingRoutes');
const busRoutes = require('./test');

router.use('/bookings', bookingRoutes);
router.use('/bus', busRoutes);

module.exports = router;