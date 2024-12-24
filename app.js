// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const busRoutes = require('./routes/busRoutes'); // Assuming your bus routes are defined in buses.js
const routeRoutes = require('./routes/routeRoutes'); // Assuming your route routes are defined in routes.js

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/buses', busRoutes);
app.use('/api/routes', routeRoutes);

// Get the port from environment variables, default to 5000 if not set
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
