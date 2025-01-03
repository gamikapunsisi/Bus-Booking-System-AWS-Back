const Bus = require('../models/Bus');
const Route = require('../models/Route');
const { registerBusValidator } = require('../validator/busValidator');

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ success: true, data: buses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Add a new bus
const addBus = async (req, res) => {
  try {
    const {
      busId,
      busName,
      busType = 'Standard', // Default value if not provided
      busOwner,
      busOwnerNIC,
      busOwnerContact,
      busOwnerEmail,
      busOwnerAddress,
      routeId,
      seatPosition,
      totalSeats,
    } = req.body;

    // Create a new Bus instance with all fields
    const newBus = new Bus({
      busId,
      busName,
      busType,
      busOwner,
      busOwnerNIC,
      busOwnerContact,
      busOwnerEmail,
      busOwnerAddress,
      routeId,
      seatPosition,
      totalSeats,
    });

    // Save the bus to the database
    await newBus.save();

    // Respond with success message and the newly created bus data
    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: newBus,
    });
  } catch (error) {
    console.error('Error creating bus:', error);
    res.status(500).json({ success: false, message: 'Failed to create bus', error: error.message });
  }
};

module.exports = { addBus };


// Update a bus by ID
const updateBus = async (req, res) => {
  const { busId } = req.params;
  const updatedData = req.body;

  try {
    const bus = await Bus.findOneAndUpdate({ busId }, updatedData, { new: true });
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update bus' });
  }
};

// Delete a bus by ID
const deleteBus = async (req, res) => {
  const { busId } = req.params;

  try {
    const bus = await Bus.findOneAndDelete({ busId });
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    res.status(200).json({ success: true, message: 'Bus deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete bus' });
  }
};

module.exports = {
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
};