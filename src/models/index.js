const mongoose = require('mongoose');

// Core schemas
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userType: { 
        type: String, 
        enum: ['COMMUTER', 'ADMIN', 'OPERATOR'], 
        default: 'COMMUTER' 
    }
}, { timestamps: true });

const tripSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true },
    busRoute: { type: String, required: true },
    driverName: { type: String, required: true },
    conductorName: { type: String, required: true },
    tripDate: { type: Date, required: true }
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

module.exports = {
    User: mongoose.model('User', userSchema),
    Trip: mongoose.model('Trip', tripSchema),
    SeatBooking: mongoose.model('SeatBooking', seatBookingSchema),
    BusRoute: mongoose.model('BusRoute', busRouteSchema)
}; 
