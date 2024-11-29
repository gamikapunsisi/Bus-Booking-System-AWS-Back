const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('./models/Route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// CREATE: Add a new route
app.post('/api/routes', async (req, res) => {
  const { routeId, routeName, distance, estimatedTime } = req.body;

  if (!routeId || !routeName || !distance || !estimatedTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRoute = await Route.create({
      routeId,
      routeName,
      distance,
      estimatedTime,
    });
    res.status(201).json({ message: 'New Route Added', route: newRoute });
  } catch (error) {
    console.error('Error adding route:', error.message);
    res.status(500).json({ message: 'Error adding route', error: error.message });
  }
});

// READ: Get all routes
app.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ routes });
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(500).json({ message: 'Error fetching routes', error: error.message });
  }
});

// UPDATE: Update a route by routeId
app.put('/api/routes/:routeId', async (req, res) => {
  const { routeId } = req.params;
  const { routeName, distance, estimatedTime } = req.body;

  try {
    const updatedRoute = await Route.findOneAndUpdate(
      { routeId },
      { routeName, distance, estimatedTime },
      { new: true } // Return the updated document
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route updated', route: updatedRoute });
  } catch (error) {
    console.error('Error updating route:', error.message);
    res.status(500).json({ message: 'Error updating route', error: error.message });
  }
});

// DELETE: Delete a route by routeId
app.delete('/api/routes/:routeId', async (req, res) => {
  const { routeId } = req.params;

  try {
    const deletedRoute = await Route.findOneAndDelete({ routeId });

    if (!deletedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route deleted', route: deletedRoute });
  } catch (error) {
    console.error('Error deleting route:', error.message);
    res.status(500).json({ message: 'Error deleting route', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
