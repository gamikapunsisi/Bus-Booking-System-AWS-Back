const { v4: uuidv4 } = require('uuid');
const { Trip, SeatBooking } = require('../models/schemas');
const routeUtils = require('./route_utils');

const createTrip = async (bus_route, driver_name, conductor_name, trip_date) => {
    const trip_id = uuidv4();
    
    const trip = await Trip.create({
        tripId: trip_id,
        busRoute: bus_route,
        driverName: driver_name,
        conductorName: conductor_name,
        tripDate: trip_date
    });
    
    return trip.tripId;
};

const bookSeats = async (trip_id, user_id, seat_ids) => {
    console.log(trip_id, user_id, seat_ids);
    const bookingIds = [];
    
    // Check if seats are already booked
    const existingSeats = await SeatBooking.find({
        tripId: trip_id,
        seatId: { $in: seat_ids }
    });

    if (existingSeats.length > 0) {
        throw new Error('One or more seats are already booked');
    }

    // Book all seats
    for (const seat_id of seat_ids) {
        const booking_id = uuidv4();
        await SeatBooking.create({
            bookingId: booking_id,
            tripId: trip_id,
            userId: user_id,
            seatId: seat_id
        });
        bookingIds.push(booking_id);
    }

    console.log(bookingIds);
    return bookingIds;
};

const getTrips = async (start, end, date) => {
    const routeInfo = await routeUtils.get_route(start, end);
    if (routeInfo.error) {
        return { error: routeInfo.error };
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const trips = await Trip.find({
        busRoute: routeInfo.route.replace(' (Reverse Direction)', ''),
        tripDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    }).select('tripId tripDate');
    
    return {
        route: routeInfo.route,
        stops: routeInfo.stops,
        numberOfStops: routeInfo.numberOfStops,
        availableTrips: trips
    };
};

module.exports = {
    createTrip,
    bookSeats,
    getTrips
};

