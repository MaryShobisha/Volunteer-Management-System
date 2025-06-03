import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Volunteer',
      version: '1.0.0',
      description: 'VOlunteer',
    },
    servers: [
      {
        url: 'http://localhost:3200',
        description: 'Local server',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts')],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;