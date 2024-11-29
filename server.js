require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');
const routeRoutes = require('./routes/routeRoutes');
const cors = require('cors');  // Add CORS middleware for cross-origin requests
const morgan = require('morgan'); // Add morgan for HTTP request logging

// Connect to MongoDB
connectDB();


const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(morgan('dev')); // Log HTTP requests in the console

// Routes
app.use('/api/routes', routeRoutes); // Specify a more descriptive path

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Ticket Booking System API');
});

// 404 Handler for non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
