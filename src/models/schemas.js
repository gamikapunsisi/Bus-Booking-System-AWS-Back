
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { Schema } = require('@mui/icons-material');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: {
      type: String,
      enum: ["COMMUTER", "ADMIN", "OPERATOR"],
      default: "COMMUTER",
    },
  },
  { timestamps: true }
);

const tripSchema = new mongoose.Schema(
  {
    tripId: { type: String, required: true, unique: true },

    busRoute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusRoute",
      required: true,
    },
    fare: { type: Number, required: true },
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
    seatStatus: [
      {
        seatNumber: String,
        isBooked: { type: Boolean, default: false },
        bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
        seatAvailableState: {
          type: String,
          enum: ["Available", "Processing", "Booked", "Hold"],
          default: "Available",
        },
      },
    ],
  },
  { timestamps: true }
);


const BookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingSeats: {
      type: [String],
      required: true,
    },
    paymentInfo: {
      type: {
        paymentMethod: {
          type: String,
          required: true,
        },
        paymentAmount: {
          type: Number,
          required: true,
        },
        paymentDate: Date,
      },
    },
    bookingStatus: {
      type: String,
      enum: ["Processing", "Completed", "Cancelled"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const busRouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true, unique: true },
  stops: [
    {
      townName: { type: String, required: true },
      stopOrder: { type: Number, required: true },
    },
  ],
});

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);





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
