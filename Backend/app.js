const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

// Import route handlers
const routesRouter = require('./routes/routes');
const busesRouter = require('./routes/buses');
const schedulesRouter = require('./routes/schedules');
const authRouter = require('./routes/auth');

// Initialize Express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/routes', routesRouter);
app.use('/api/buses', busesRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// MongoDB connection setup
// MongoDB connection setup
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Only use the environment variable
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(uri); // Attempt to connect using the provided URI
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};


// Start the server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

module.exports = app;
