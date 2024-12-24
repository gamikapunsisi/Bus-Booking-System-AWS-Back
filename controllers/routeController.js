const Route = require('../models/Route');

// GET: Fetch all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch routes" });
  }
};

// GET: Fetch a specific route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch route" });
  }
};

// POST: Create a new route
exports.createRoute = async (req, res) => {
  const { routeId, routeName, distance, estimatedTime } = req.body;
  try {
    const newRoute = new Route({
      routeId,
      routeName,
      distance,
      estimatedTime
    });
    await newRoute.save();
    res.status(201).json({ message: "Route created successfully", route: newRoute });
  } catch (error) {
    res.status(400).json({ message: "Failed to create route", error });
  }
};

// PUT: Update an existing route by ID
exports.updateRoute = async (req, res) => {
  const { routeId, routeName, distance, estimatedTime } = req.body;
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      { routeId, routeName, distance, estimatedTime },
      { new: true }
    );
    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    res.status(400).json({ message: "Failed to update route", error });
  }
};

// PATCH: Partially update route details
exports.updateRoutePartially = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    res.status(400).json({ message: "Failed to update route", error });
  }
};

// DELETE: Delete a route by ID
exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete route" });
  }
};
