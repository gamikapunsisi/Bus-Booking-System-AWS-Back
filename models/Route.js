const mongoose = require('mongoose');

// Define schema for the "routes" collection
const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: [true, 'Route ID is required'],
    match: [/^\d{2}-\d{1,2}$/, 'Please enter a valid Route ID (e.g., 22-2)'],
  },
  routeName: {
    type: String,
    required: [true, 'Route Name is required'],
    minlength: [5, 'Route Name must be at least 5 characters long'],
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    min: [0, 'Distance cannot be negative'],
  },
  estimatedTime: {
    type: String,
    required: [true, 'Estimated Time is required'],
  },
});

// Create model for the "routes" collection
const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
