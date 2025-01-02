const mongoose = require('mongoose');

// Define seat position schema
const seatPositionSchema = new mongoose.Schema({
  leftPosition: {
    numberOfSeatsPerRow: { type: Number, required: true },
    numberOfRows: { type: Number, required: true },
  },
  rightPosition: {
    numberOfSeatsPerRow: { type: Number, required: true },
    numberOfRows: { type: Number, required: true },
  },
  backPosition: {
    numberOfSeatsPerRow: { type: Number, required: true },
    numberOfRows: { type: Number, required: true },
  },
});

// Define bus schema
const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  busName: { type: String, required: true },
  busType: { type: String, default: 'Standard' },
  busOwner: { type: String, required: true },
  busOwnerNIC: { type: String, required: true },
  busOwnerContact: { type: String, required: true },
  busOwnerEmail: { type: String, required: true },
  busOwnerAddress: { type: String, required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  totalSeats: { type: Number, required: true },
  seatPosition: seatPositionSchema, // Embed seat position schema
});

// Create Bus model
const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
