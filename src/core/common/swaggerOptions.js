// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your Project API',
      version: '1.0.0',
      description: 'API documentation for your POS system',
    },
    servers: [
      {
        url: 'http://localhost:7200', // change based on your dev port
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], // path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
