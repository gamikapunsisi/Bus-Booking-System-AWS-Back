const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const roadRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/bookingRoutes')
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./utils/db');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', roadRoutes);
app.use('/api/trips', tripRoutes)
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;