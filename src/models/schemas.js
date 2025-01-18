const { Schema } = require('@mui/icons-material');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: { 
        type: String, 
        enum: ['COMMUTER', 'ADMIN', 'OPERATOR'], 
        default: 'COMMUTER' 
    }
}, { timestamps: true });

const tripSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true },
    busRoute: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
        required: true 
    },
    driverName: { type: String, required: true },
    conductorName: { type: String, required: true },
    tripDate: { type: Date, required: true },
    departureTime: {
        type: String,
        required: false,
      },
      arrivalTime: {
        type: String,
        required: true,
      },
      busId: {
        type: Schema.Types.ObjectId,
        ref: 'Bus',
      }
}, { timestamps: true });

const seatBookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    tripId: { type: String, required: true },
    userId: { type: String, required: true },
    seatId: { type: String, required: true }
}, { 
    timestamps: true,
    index: { tripId: 1, seatId: 1 }, 
    unique: true 
});

const busRouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true, unique: true },
    stops: [{
        townName: { type: String, required: true },
        stopOrder: { type: Number, required: true }
    }]
});

const refreshTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true, unique: true }
}, { timestamps: true });



const BusSchema = new Schema(
    {
      busId: {
        type: String,
        required: true,
        unique: true,
      },
      busName: {
        type: String,
        required: true,
      },
      busType: {
        type: String,
        required: true,
      },
      totalSeats: {
        type: Number,
        required: true,
      },
      seatPosition: {
        leftPosition: {
          numberOfSeatsPerRow: Number,
          numberOfRows: Number,
        },
        rightPosition: {
          numberOfSeatsPerRow: Number,
          numberOfRows: Number,
        },
        backPosition: {
          numberOfSeatsPerRow: Number,
          numberOfRows: Number,
        },
      },
      seatLayout: [
        {
          seatNumber: String,
          isBooked: { type: Boolean, default: false },
        },
      ],
      routeId: { type: Schema.Types.ObjectId, ref: "BusRoute" },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  );

module.exports = {
    User: mongoose.model('User', userSchema),
    Trip: mongoose.model('Trip', tripSchema),
    SeatBooking: mongoose.model('SeatBooking', seatBookingSchema),
    BusRoute: mongoose.model('BusRoute', busRouteSchema),
    RefreshToken: mongoose.model('RefreshToken', refreshTokenSchema),
    Bus: mongoose.model('Bus', BusSchema)
}; 