const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  busName: {
    type: String,
    required: true,
    trim: true,
  },
  busType: {
    type: String,
    required: true,
    enum: ["Normal", "Luxury", "Express"],
  },
  busOwner: {
    type: String,
    required: true,
    trim: true,
  },
  busOwnerNIC: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  busOwnerContact: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  busOwnerEmail: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  busOwnerAddress: {
    type: String,
    required: true,
    trim: true,
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
