const express = require("express");
const Route = require("./models/Route");
const router = express.Router();

// Fetch all routes
router.get("/routes", async (req, res) => {
  try {
    const routes = await Route.find();  // Fetch all routes from MongoDB
    res.json(routes);  // Send the routes as a response
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ message: "Failed to fetch routes" });
  }
});

module.exports = router;
