const mongoose = require('mongoose');

const seatPositionSchema = new mongoose.Schema({
  numberOfSeatsPerRow: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  numberOfRows: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  }
});

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
    enum: ['Normal', 'Semi-Luxury', 'Luxury']
  },
  busOwner: { 
    type: String, 
    required: true,
    trim: true
  },
  busOwnerContact: { 
    type: String, 
    required: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit contact number']
  },
  busOwnerEmail: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  busOwnerAddress: { 
    type: String, 
    required: true,
    trim: true
  },
  busOwnerNIC: { 
    type: String, 
    required: true,
    trim: true,
    match: [/^[0-9]{9}[vVxX]$/, 'Please provide a valid NIC number']
  },
  totalSeats: { 
    type: Number, 
    required: true,
    min: 1
  },
  routeId: { 
    type: String,
    required: true,
    trim: true
  },
  seatPosition: {
    leftPosition: seatPositionSchema,
    rightPosition: seatPositionSchema,
    backPosition: seatPositionSchema
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate total seats
busSchema.pre('save', function(next) {
  const leftSeats = this.seatPosition.leftPosition.numberOfSeatsPerRow * 
                   this.seatPosition.leftPosition.numberOfRows;
  const rightSeats = this.seatPosition.rightPosition.numberOfSeatsPerRow * 
                    this.seatPosition.rightPosition.numberOfRows;
  const backSeats = this.seatPosition.backPosition.numberOfSeatsPerRow * 
                   this.seatPosition.backPosition.numberOfRows;
  
  this.totalSeats = leftSeats + rightSeats + backSeats;
  next();
});

// Custom validation method
busSchema.methods.validateSeatConfiguration = function() {
  const seatPosition = this.seatPosition;
  
  // Validate left position
  if (seatPosition.leftPosition.numberOfSeatsPerRow > 3 || 
      seatPosition.leftPosition.numberOfRows > 10) {
    throw new Error('Invalid left position configuration');
  }
  
  // Validate right position
  if (seatPosition.rightPosition.numberOfSeatsPerRow > 3 || 
      seatPosition.rightPosition.numberOfRows > 10) {
    throw new Error('Invalid right position configuration');
  }
  
  // Validate back position
  if (seatPosition.backPosition.numberOfSeatsPerRow > 5 || 
      seatPosition.backPosition.numberOfRows !== 1) {
    throw new Error('Invalid back position configuration');
  }
  
  return true;
};

// Pre-save middleware to validate seat configuration
busSchema.pre('save', async function(next) {
  try {
    await this.validateSeatConfiguration();
    next();
  } catch (error) {
    next(error);
  }
});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus; 