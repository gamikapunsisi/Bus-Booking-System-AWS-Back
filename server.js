const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeRoutes = require('./routes/routeRoutes');

dotenv.config();  

const app = express();

// Middleware to parse JSON data from the body of requests
app.use(express.json());

// Use routes
app.use('/api/routes', routeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
