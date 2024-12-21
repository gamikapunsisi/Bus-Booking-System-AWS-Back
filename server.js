const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Use middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define MongoDB schema
const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true },
  routeName: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedTime: { type: String, required: true },
});


// Create a model
const Route = mongoose.model('Route', routeSchema);

// Define API Routes
// Fetch all routes from the database
app.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json({ success: true, data: routes });
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to fetch routes.' });
  }
});

// Add a new route to the database
app.post('/api/routes', async (req, res) => {
  const { routeId, routeName, distance, estimatedTime } = req.body;

  if (!routeId || !routeName || !distance || !estimatedTime) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
    const newRoute = new Route({ routeId, routeName, distance, estimatedTime });
    await newRoute.save();
    res.status(201).json({ success: true, data: newRoute });
  } catch (error) {
    console.error('Error adding route:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to add route.' });
  }
});


// Set up the server to listen on the configured PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
