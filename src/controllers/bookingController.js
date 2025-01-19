const { v4: uuidv4 } = require("uuid");

const { Booking } = require("../models/schemas");

// create a new booking
const createBooking = async (req, res) => {
  try {
    const { tripId, bookingSeats, paymentInfo } = req.body;
    const userId = req.user.userId;

    if (
      !tripId ||
      !bookingSeats ||
      !Array.isArray(bookingSeats) ||
      !paymentInfo
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request parameters",
      });
    }

    // Verify payment info first

    const bookingId = uuidv4();
    const booking = new Booking({
      bookingId,
      tripId,
      userId,
      bookingSeats,
      paymentInfo: { ...paymentInfo, paymentDate: new Date() },
      bookingStatus: "Completed",
    });

    await booking.save();

    res.status(201).json({
      success: true,
      booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// get booknigs by trip id
const getBookingsByTripId = async (req, res) => {
  try {
    const { tripId } = req.params;

    const bookings = await Booking.find({ tripId });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// get booking by booking id
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// get bookings by user id
const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookingsByTripId,
  getBookingById,
  getBookingsByUserId,
};
