export const swaggerConfig = {
    swagger: {
      info: {
        title: 'RESTful APIs using Fastify',
        description: 'CRUDs using Swagger, Fastify and Prisma',
        version: '0.0.1'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'users', description: 'Users related end-points' },
        { name: 'payments', description: 'Payments related end-points' },
        { name: 'transactions', description: 'Transactions related end-points' }
      ],
    }
  };
  