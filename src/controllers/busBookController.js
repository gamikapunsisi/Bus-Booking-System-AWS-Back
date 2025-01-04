const { createTrip, bookSeats, getTrips } = require('../utils/book_utils');
const { Trip, SeatBooking } = require('../models/schemas');

const getTripController = async (req, res) => {
    try {
        const { start, end, date } = req.body;
        if (!start || !end || !date) {
            return res.status(400).json({ error: 'Start, end locations and date are required' });
        }

        const trips = await getTrips(start, end, date);
        console.log(trips);
        if (trips.error) {
            return res.status(404).json({ error: trips.error });
        }
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTripController = async (req, res) => {
    try {
        const { bus_route, driver_name, conductor_name, trip_date } = req.body;
        
        const tripDate = new Date(trip_date);
        const trip_id = await createTrip(bus_route, driver_name, conductor_name, tripDate);
        
        res.status(201).json({
            success: true,
            trip_id,
            message: 'Trip created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create trip',
            error: error.message
        });
    }
};

const bookSeatsController = async (req, res) => {
    try {
        const { trip_id, seat_ids, payment_info } = req.body;
        const user_id = req.user.userId;
        
        if (!trip_id || !seat_ids || !Array.isArray(seat_ids) || !payment_info) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request parameters'
            });
        }

        // Verify payment info first
        // TODO: Implement payment verification logic here
        // const paymentVerified = await verifyPayment(payment_info);
        // if (!paymentVerified) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Payment verification failed'
        //     });
        // }

        const bookingIds = await bookSeats(trip_id, user_id, seat_ids);
        
        res.status(201).json({
            success: true,
            booking_ids: bookingIds,
            payment_status: 'success',
            message: 'Seats booked successfully'
        });
    } catch (error) {
        const statusCode = error.message.includes('UNIQUE constraint failed') ? 409 : 500;
        res.status(statusCode).json({
            success: false,
            message: statusCode === 409 ? 'One or more seats are already booked' : 'Failed to book seats',
            error: error.message
        });
    }
};

const getBookedSeatsController = async (req, res) => {
    try {
        const { tripId } = req.params;
        console.log('tripId', tripId);
        const bookedSeats = await SeatBooking.find(
            { tripId: tripId }
        ).lean();
        console.log('bookedSeats', bookedSeats);
        const seatIds = bookedSeats.map(booking => booking.seatId);
        
        res.json({ 
            success: true,
            bookedSeats: seatIds 
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booked seats',
            error: error.message
        });
    }
};

const getTripsController = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ trip_date: -1 });
        res.json({ trips });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trips',
            error: error.message
        });
    }
};

const getTripByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id);
        
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }
        res.json({ trip });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trip',
            error: error.message
        });
    }
};

const updateTripController = async (req, res) => {
    try {
        const { id } = req.params;
        const { bus_route, driver_name, conductor_name, trip_date } = req.body;

        const trip = await Trip.findByIdAndUpdate(
            id,
            { bus_route, driver_name, conductor_name, trip_date },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        res.json({
            success: true,
            message: 'Trip updated successfully',
            trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update trip',
            error: error.message
        });
    }
};

const deleteTripController = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndDelete(id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        res.json({
            success: true,
            message: 'Trip deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete trip',
            error: error.message
        });
    }
};

module.exports = {
    createTripController,
    bookSeatsController,
    getTripController,
    getBookedSeatsController,
    getTripsController,
    getTripByIdController,
    updateTripController,
    deleteTripController
};
