const Route = require('../models/Route');

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ success: true, data: routes });
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to fetch routes.' });
  }
};

// Add a new route
const addRoute = async (req, res) => {
  try {
    console.log('Headers:', req.headers);
    console.log('Raw Body:', req.body);
    
    // Check if body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty",
      });
    }

    const { routeId, routeName, distance, estimatedTime } = req.body;
    
    // Create validation object
    const missingFields = {
      routeId: !routeId,
      routeName: !routeName,
      distance: !distance,
      estimatedTime: !estimatedTime
    };

    // Check for missing fields
    if (Object.values(missingFields).some(field => field)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        missingFields,
        receivedData: req.body
      });
    }

    const newRoute = await Route.create({
      routeId,
      routeName,
      distance,
      estimatedTime
    });

    res.status(201).json({
      success: true,
      data: newRoute
    });
  } catch (error) {
    console.error('Error adding route:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to add route.',
      error: error.message
    });
  }
};

// Update a route
const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findOneAndUpdate(
      { routeId: req.params.routeId },
      req.body,
      { new: true }
    );
    if (!updatedRoute) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, data: updatedRoute });
  } catch (error) {
    console.error('Error updating route:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to update route.' });
  }
};

// Delete a route
const deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findOneAndDelete({ routeId: req.params.routeId });
    if (!deletedRoute) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, data: deletedRoute });
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to delete route.' });
  }
};

module.exports = { getAllRoutes, addRoute, updateRoute, deleteRoute };
