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
    }

    const checkUser = await User.findOne({ email: busOwnerEmail });
    if (checkUser) {
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
