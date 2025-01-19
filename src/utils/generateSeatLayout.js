const generateSeatLayout = (seatPosition) => {

    const { leftPosition, rightPosition, backPosition } = seatPosition;
    const seatLayout = [];
    let seatCounter = 1;
  
    // Generate leftPosition seats
    for (let row = 1; row <= leftPosition.numberOfRows; row++) {
      for (let col = 1; col <= leftPosition.numberOfSeatsPerRow; col++) {
        seatLayout.push({
          seatNumber: `L${row}-${col}`, // Example: L1-1, L1-2
          isBooked: false,
        });
        seatCounter++;
      }
    }
  
    // Generate rightPosition seats
    for (let row = 1; row <= rightPosition.numberOfRows; row++) {
      for (let col = 1; col <= rightPosition.numberOfSeatsPerRow; col++) {
        seatLayout.push({
          seatNumber: `R${row}-${col}`, // Example: R1-1, R1-2
          isBooked: false,
        });
        seatCounter++;
      }
    }
  
    // Generate backPosition seats
    for (let row = 1; row <= backPosition.numberOfRows; row++) {
      for (let col = 1; col <= backPosition.numberOfSeatsPerRow; col++) {
        seatLayout.push({
          seatNumber: `B${row}-${col}`, // Example: B1-1, B1-2
          isBooked: false,
        });
        seatCounter++;
      }
    }
  
    return seatLayout;
  };
  
  module.exports = { generateSeatLayout };
  