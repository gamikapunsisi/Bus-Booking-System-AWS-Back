<<<<<<< HEAD
const { Bus, User } = require("../models/schemas");
const { generateSeatLayout } = require("../utils/generateSeatLayout");
const { v4: uuidv4 } = require('uuid');

const registerBus = async (req, res) => {
  try {
    const {
      busId,
      busName,
      busType,
      busOwnerFirstName,
      busOwnerLastName,
      busOwnerContact,
      busOwnerEmail,
      totalSeats,
      routeId,
      seatPosition,
      password,
    } = req.body;

    // Check if busId already exists
    const busExists = await Bus.findOne({ busId });
    if (busExists) {
      return res.status(400).json({
        success: false,
        message: "Bus Id Already Exists",
      });
=======
const { Bus } = require("../models/schemas");

const createTripController = async (req, res) => {
    try {
        const { 
            busId,
            busName,
            busType,
            busOwnerUserName,
            busOwnerFirstName,
            busOwnerLastName,
            busOwnerContact,
            busOwnerEmail,
            busOwnerAddress,
            busOwnerNIC,
            totalSeats,
            routeId,
            seatPosition,
         } = req.body;
        
         // Check if busId already exists
    const busExists = await Bus.findOne({ busId });
    if (busExists) {
      return  res.status(400).json({
        success: false,
        message: 'Bus Id Already Exists'
    });
>>>>>>> b241278350e608e17436d2dbe428ff1b8c845a16
    }

    const checkUser = await User.findOne({ email: busOwnerEmail });
    if (checkUser) {
<<<<<<< HEAD
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user_id = uuidv4();

    const newUser = new User({
      userId: user_id,
      email: busOwnerEmail,
      password: password,
      firstName: busOwnerFirstName,
      lastName: busOwnerLastName,
      phoneNumber: busOwnerContact,
      userType: "OPERATOR",
    });
    
    const user = await newUser.save();
    const { _id: userId } = user;

    const seatLayout = generateSeatLayout(seatPosition);

    const bus = new Bus({
      busId,
      busName,
      busType,
      totalSeats,
      seatPosition,
      routeId,
      userId,
      seatLayout,
    });

    await bus.save();

    res.status(201).json({
      success: true,
      message: "Bus created successfully",
      data: bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create bus",
      error: error.message,
    });
  }
};

// getBusById

const getBusById = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findOne({ busId });

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bus",
      error: error.message,
    });
  }
};

// getBusByRouteId

const getBusByRouteId = async (req, res) => {
  try {
    const { routeId } = req.params;
    const bus = await Bus.find({ routeId });

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bus",
      error: error.message,
    });
  }
};

// get All Buses

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();

    if (!buses) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      data: buses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bus",
      error: error.message,
    });
  }
};

module.exports = { registerBus, getBusById, getBusByRouteId, getAllBuses };
=======
        return  res.status(400).json({
            success: false,
            message: 'Bus Id Already Exists'});
    }
        
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
>>>>>>> b241278350e608e17436d2dbe428ff1b8c845a16
