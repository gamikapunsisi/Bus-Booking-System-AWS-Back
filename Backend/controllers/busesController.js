const Bus = require('../models/Bus');

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    res.status(200).json({ success: true, data: buses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error - Unable to fetch buses.' });
  }
};

// Add a new bus
const addBus = async (req, res) => {
  try {
    const newBus = await Bus.create(req.body);
    res.status(201).json({ success: true, data: newBus });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Server Error - Unable to add bus.' 
    });
  }
};

// Update a bus
const updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findOneAndUpdate(
      { busId: req.params.busId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.json({ success: true, data: updatedBus });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Server Error - Unable to update bus.' 
    });
  }
};

// Delete a bus
const deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findOneAndDelete({ busId: req.params.busId });
    if (!deletedBus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.json({ success: true, data: deletedBus });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server Error - Unable to delete bus.' 
    });
  }
};

module.exports = { getAllBuses, addBus, updateBus, deleteBus };
