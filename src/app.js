const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const roadRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/bookingRoutes')
const authRoutes = require('./routes/authRoutes');
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
app.use('/auth', authRoutes);
app.use('/api/routes', roadRoutes);
app.use('/api/trips', tripRoutes)

app.use(errorHandler);

module.exports = app;