const Bus = require('../models/Bus');
const Route = require('../models/Route');

// GET: Fetch all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

// GET: Fetch a specific bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('routeId');
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bus" });
  }
};

// POST: Create a new bus
exports.createBus = async (req, res) => {
  const { busId, busName, busType, busOwner, busOwnerContact, busOwnerEmail, busOwnerAddress, busOwnerNIC, totalSeats, routeId, seatPosition } = req.body;
  try {
    const route = await Route.findById(routeId); // Ensure the route exists
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    
    const newBus = new Bus({
      busId,
      busName,
      busType,
      busOwner,
      busOwnerContact,
      busOwnerEmail,
      busOwnerAddress,
      busOwnerNIC,
      totalSeats,
      routeId,
      seatPosition
    });
    await newBus.save();
    res.status(201).json({ message: "Bus created successfully", bus: newBus });
  } catch (error) {
    res.status(400).json({ message: "Failed to create bus", error });
  }
};

// PUT: Update an existing bus by ID
exports.updateBus = async (req, res) => {
  const { busId, busName, busType, busOwner, busOwnerContact, busOwnerEmail, busOwnerAddress, busOwnerNIC, totalSeats, routeId, seatPosition } = req.body;
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      { busId, busName, busType, busOwner, busOwnerContact, busOwnerEmail, busOwnerAddress, busOwnerNIC, totalSeats, routeId, seatPosition },
      { new: true }
    );
    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    res.status(400).json({ message: "Failed to update bus", error });
  }
};

// DELETE: Delete a bus by ID
exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete bus" });
  }
};
