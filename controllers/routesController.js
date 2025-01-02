let routes = []; // In-memory data storage (Replace with a database in production)

// Get all routes
const getAllRoutes = (req, res) => {
  res.status(200).json({ success: true, data: routes });
};

// Add a new route
const addRoute = (req, res) => {
  const { routeId, routeName, distance, estimatedTime } = req.body;

  if (!routeId || !routeName || !distance || !estimatedTime) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newRoute = { routeId, routeName, distance, estimatedTime };
  routes.push(newRoute);
  res.status(201).json({ success: true, message: "Route added successfully", data: newRoute });
};

module.exports = { getAllRoutes, addRoute };
