const { check, validationResult } = require('express-validator');

const busValidationRules = [
  check('busId').notEmpty().withMessage('Bus ID is required'),
  check('busName').notEmpty().withMessage('Bus Name is required'),
  check('busType').notEmpty().withMessage('Bus Type is required'),
  check('busOwner').notEmpty().withMessage('Bus Owner is required'),
  check('busOwnerContact')
    .notEmpty()
    .withMessage('Bus Owner Contact is required')
    .isMobilePhone()
    .withMessage('Invalid contact number'),
  check('busOwnerEmail')
    .notEmpty()
    .withMessage('Bus Owner Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('busOwnerAddress').notEmpty().withMessage('Bus Owner Address is required'),
  check('busOwnerNIC').notEmpty().withMessage('Bus Owner NIC is required'),
  check('totalSeats')
    .notEmpty()
    .withMessage('Total Seats is required')
    .isInt({ min: 1 })
    .withMessage('Total Seats must be a positive integer')
    .custom((value, { req }) => {
      const { leftPosition, rightPosition, backPosition } = req.body.seatPosition;
      
      // Ensure the seat positions exist before calculating
      if (!leftPosition || !rightPosition || !backPosition) {
        throw new Error('Invalid seat position data');
      }

      const totalCalculatedSeats =
        leftPosition.numberOfRows * leftPosition.numberOfSeatsPerRow +
        rightPosition.numberOfRows * rightPosition.numberOfSeatsPerRow +
        backPosition.numberOfRows * backPosition.numberOfSeatsPerRow;

      if (value !== totalCalculatedSeats) {
        throw new Error('Total Seats mismatch with seat position');
      }
      return true;
    }),
  check('routeId').notEmpty().withMessage('Route ID is required'),
  check('seatPosition.leftPosition.numberOfSeatsPerRow')
    .notEmpty()
    .withMessage('Number of seats per row in left position is required')
    .isInt({ min: 1 })
    .withMessage('Number of seats per row must be a positive integer'),
  check('seatPosition.leftPosition.numberOfRows')
    .notEmpty()
    .withMessage('Number of rows in left position is required')
    .isInt({ min: 1 })
    .withMessage('Number of rows must be a positive integer'),
  check('seatPosition.rightPosition.numberOfSeatsPerRow')
    .notEmpty()
    .withMessage('Number of seats per row in right position is required')
    .isInt({ min: 1 })
    .withMessage('Number of seats per row must be a positive integer'),
  check('seatPosition.rightPosition.numberOfRows')
    .notEmpty()
    .withMessage('Number of rows in right position is required')
    .isInt({ min: 1 })
    .withMessage('Number of rows must be a positive integer'),
  check('seatPosition.backPosition.numberOfSeatsPerRow')
    .notEmpty()
    .withMessage('Number of seats per row in back position is required')
    .isInt({ min: 1 })
    .withMessage('Number of seats per row must be a positive integer'),
  check('seatPosition.backPosition.numberOfRows')
    .notEmpty()
    .withMessage('Number of rows in back position is required')
    .isInt({ min: 1 })
    .withMessage('Number of rows must be a positive integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = { busValidationRules, validate };