const Route = require('../models/Route');

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find(); // Fetch all routes from the database
    if (!routes || routes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No routes found',
      });
    }
    res.status(200).json({
      success: true,
      data: routes, // Send the retrieved routes in the response
    });
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to fetch routes.',
      error: error.message,
    });
  }
};

// Add a new route
const addRoute = async (req, res) => {
  try {
    console.log('Received headers:', req.headers);
    console.log('Received body:', req.body);
    
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty.',
      });
    }

    const { routeId, routeName, distance, estimatedTime } = req.body;
    
    // Validation object to check for missing fields
    const missingFields = {
      routeId: !routeId,
      routeName: !routeName,
      distance: !distance,
      estimatedTime: !estimatedTime,
    };

    // Check if any field is missing
    if (Object.values(missingFields).includes(true)) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
        missingFields,
        receivedData: req.body,
      });
    }

    // Create and save the new route
    const newRoute = await Route.create({
      routeId,
      routeName,
      distance,
      estimatedTime,
    });

    res.status(201).json({
      success: true,
      data: newRoute, // Respond with the saved route data
    });
  } catch (error) {
    console.error('Error adding route:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to add route.',
      error: error.message,
    });
  }
};

// Update a route
const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findOneAndUpdate(
      { routeId: req.params.routeId }, // Find route by routeId
      req.body, // Data to update
      { new: true } // Return the updated document
    );

    if (!updatedRoute) {
      return res.status(404).json({
        success: false,
        message: 'Route not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRoute, // Return the updated route
    });
  } catch (error) {
    console.error('Error updating route:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to update route.',
      error: error.message,
    });
  }
};

// Delete a route
const deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findOneAndDelete({ routeId: req.params.routeId });

    if (!deletedRoute) {
      return res.status(404).json({
        success: false,
        message: 'Route not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedRoute, // Return the deleted route data
      message: 'Route deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting route:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to delete route.',
      error: error.message,
    });
  }
};

module.exports = { getAllRoutes, addRoute, updateRoute, deleteRoute };
