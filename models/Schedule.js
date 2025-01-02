const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  busId: {
    type: String,
    required: true,
    trim: true
  },
  route: {
    type: String,
    required: true,
    enum: ['GALLE-MAKUMBURA', 'MAKUMBURA-GALLE']
  },
  runningNo: {
    type: String,
    required: true,
    trim: true
  },
  departureTime: {
    type: String,
    required: true,
    trim: true
  },
  arrivalTime: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Validate time format
scheduleSchema.path('departureTime').validate(function(time) {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}, 'Invalid time format. Use HH:mm format');

scheduleSchema.path('arrivalTime').validate(function(time) {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}, 'Invalid time format. Use HH:mm format');

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule; 