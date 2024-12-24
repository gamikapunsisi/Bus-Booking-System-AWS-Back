// models/bus.js
const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',  // Referencing the Route model
    required: true,
  },
  // Add any other fields for the Bus schema
});

const Bus = mongoose.model('Bus', BusSchema);

module.exports = Bus;
