const express = require('express');
const Route = require('../models/Route');

const router = express.Router();

// Add a new route
router.post('/routes', async (req, res) => {
    try {
      console.log('Request body:', req.body); // Log the incoming request data
  
      const { routeId, routeName, distance, estimatedTime } = req.body;
  
      if (!routeId || !routeName || !distance || !estimatedTime) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newRoute = new Route({
        routeId,
        routeName,
        distance,
        estimatedTime,
      });
  
      const savedRoute = await newRoute.save();
      console.log('Saved route:', savedRoute); // Log the saved route
      res.status(201).json({ message: 'Route created successfully', route: savedRoute });
    } catch (error) {
      console.error('Error saving route:', error); // Log the error
      res.status(500).json({ message: 'Error saving route', error: error.message });
    }
  });
  
module.exports = router;
