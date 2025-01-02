let buses = []; 

// Get all buses
const getAllBuses = (req, res) => {
  res.status(200).json({ success: true, data: buses });
};

// Add a new bus
const addBus = (req, res) => {
  const { busId, busName, busType, busOwner, busOwnerNIC, busOwnerContact, busOwnerEmail, busOwnerAddress, totalSeats, routeId } = req.body;

  
  if (!busId || !busName || !busType || !busOwner || !busOwnerNIC || !busOwnerContact || !busOwnerEmail || !busOwnerAddress || !totalSeats || !routeId) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  
  const newBus = { busId, busName, busType, busOwner, busOwnerNIC, busOwnerContact, busOwnerEmail, busOwnerAddress, totalSeats, routeId };

  buses.push(newBus); // Add bus to the in-memory array
  res.status(201).json({ success: true, message: "Bus added successfully", data: newBus });
};

module.exports = { getAllBuses, addBus };
