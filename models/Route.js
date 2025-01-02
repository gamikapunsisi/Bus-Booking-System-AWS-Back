const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true },
  routeName: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedTime: { type: String, required: true },
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
