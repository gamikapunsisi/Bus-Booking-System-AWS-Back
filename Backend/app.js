const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import connectDB function
require('dotenv').config(); // Load environment variables from .env

// Import route handlers
const routesRouter = require('./routes/routes');
const busesRouter = require('./routes/buses');
const schedulesRouter = require('./routes/schedules');
const authRouter = require('./routes/auth');

// Initialize Express app
const app = express();

// Middleware: CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL from .env or default
    credentials: true,
  })
);

// Middleware: JSON and URL-encoded data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Debug logging for incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Route: Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes: API endpoints
app.use('/api/routes', routesRouter);
app.use('/api/buses', busesRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api/auth', authRouter);

// Middleware: Error handling
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server after connecting to the database
const PORT = process.env.PORT || 5001;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  });

module.exports = app;
