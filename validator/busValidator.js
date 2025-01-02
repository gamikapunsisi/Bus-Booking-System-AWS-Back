const registerBusValidator = (body) => {
    const {
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
      seatPosition,
    } = body;
  
    const { leftPosition, rightPosition, backPosition } = seatPosition;
  
    if (busId === undefined || busId === "") {
      return errorHandler(400, "Bus ID is required");
    } else if (busType === undefined || busType === "") {
      return errorHandler(400, "Bus Type is required");
    } else if (busOwnerUserName === undefined || busOwnerUserName === "") {
      return errorHandler(400, "Bus Owner is required");
    } else if (busOwnerFirstName === undefined || busOwnerFirstName === "") {
      return errorHandler(400, "Bus Owner First Name is required");
    } else if (busOwnerLastName === undefined || busOwnerLastName === "") {
      return errorHandler(400, "Bus Owner Last Name is required");
    } else if (busOwnerContact === undefined || busOwnerContact === "") {
      return errorHandler(400, "Bus Owner Contact is required");
    } else if (busOwnerEmail === undefined || busOwnerEmail === "") {
      return errorHandler(400, "Bus Owner Email is required");
    } else if (busOwnerAddress === undefined || busOwnerAddress === "") {
      return errorHandler(400, "Bus Owner Address is required");
    } else if (busOwnerNIC === undefined || busOwnerNIC === "") {
      return errorHandler(400, "Bus Owner NIC is required");
    } else if (totalSeats === undefined || totalSeats === "") {
      return errorHandler(400, "Total Seats is required");
    } else if (routeId === undefined || routeId === "") {
      return errorHandler(400, "Route ID is required");
    } else if (
      totalSeats !==
      leftPosition.numberOfRows * leftPosition.numberOfSeatsPerRow +
        rightPosition.numberOfRows * rightPosition.numberOfSeatsPerRow +
        backPosition.numberOfRows * backPosition.numberOfSeatsPerRow
    ) {
      return errorHandler(400, "Total Seats mismatch with seat position");
    } else {
      return true;
    }
  };
  
  module.exports = { registerBusValidator };
  
