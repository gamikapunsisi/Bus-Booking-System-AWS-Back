const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-BusReserv Booking API',
      version: '1.0.0',
      description: 'API documentation for the Bus Booking System ',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // API routes path
};

const specs = swaggerJsdoc(options);

module.exports = specs; 