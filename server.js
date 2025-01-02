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
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define MongoDB schema for routes
const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true },
  routeName: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedTime: { type: String, required: true },
});

// Create a model for Route
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

// MongoDB schema for buses
const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  busName: {
    type: String,
    required: true,
    trim: true
  },
  busType: {
    type: String,
    required: true,
    enum: ['Normal', 'Luxury', 'Express'], // Modify the options as per your use case
  },
  busOwner: {
    type: String,
    required: true,
    trim: true
  },
  busOwnerNIC: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  busOwnerContact: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Simple regex for validating a 10-digit contact number
  },
  busOwnerEmail: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/, // Simple email validation regex
  },
  busOwnerAddress: {
    type: String,
    required: true,
    trim: true
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1, 
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route', 
    required: true
  }
});

// Create a model for Bus
const Bus = mongoose.model('Bus', busSchema);

// API route to fetch all buses
app.get('/api/buses', async (req, res) => { 
  try {
    // console.log("Fetching buses");  
    const buses = await Bus.find();  
    res.json({ success: true, data: buses });
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ success: false, message: 'Server Error - Unable to fetch buses.' });
  }
});

// API route to add a new bus


app.post('/api/buses', async (req, res) => {
  const { busId, busName, busType, busOwner, busOwnerNIC, busOwnerContact, busOwnerEmail, busOwnerAddress, totalSeats, routeId } = req.body;

  if (!busId || !busName || !busType || !busOwner || !busOwnerNIC || !busOwnerContact || !busOwnerEmail || !busOwnerAddress || !totalSeats || !routeId) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
    // Check if routeId is a valid ObjectId (MongoDB's ObjectId)
    let convertedRouteId;
    if (mongoose.Types.ObjectId.isValid(routeId)) {
      convertedRouteId = new mongoose.Types.ObjectId(routeId); // Convert routeId to ObjectId
    } else {
      // If routeId is not a valid ObjectId, handle it differently, e.g., store it as an integer
      convertedRouteId = parseInt(routeId); // If it's a string representing a number, parse it as integer
    }

    const newBus = new Bus({
      busId,
      busName,
      busType,
      busOwner,
      busOwnerNIC,
      busOwnerContact,
      busOwnerEmail,
      busOwnerAddress,
      totalSeats,
      routeId: convertedRouteId, // Use the converted routeId
    });

    await newBus.save();
    res.status(201).json({ success: true, data: newBus });
  } catch (error) {
    console.error('Error adding bus:', error);
    res.status(500).json({ success: false, message: 'Error adding bus' });
  }
});

// Set up the server to listen on the configured PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
