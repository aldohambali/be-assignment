const fastify = require('fastify')({ logger: true });
import fastifySwagger from "@fastify/swagger";
// import { payments } from "./routes/payments";
// import { transactions } from "./routes/transactions";
// import { users } from "./routes/users";
import { swaggerConfig } from "./config/swagger.config";
import fastifySwaggerUi from "@fastify/swagger-ui";

import usersRoutes from "./routes/users.routes";
import { messageSchema, paginationSchema, paramIdSchema } from "./schema/commond.schema";
import { paymentSchema, userSchema, transactionSchema } from "./schema/models.schema";
import paymentsRoutes from "./routes/payments.routes";
import transactionsRoutes from "./routes/transactions.routes";



// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// fastify.register(users)
// fastify.register(payments)
// fastify.register(transactions)

  // Json Schemas
  fastify.addSchema(paginationSchema);
  fastify.addSchema(paramIdSchema);
  fastify.addSchema(messageSchema);

  fastify.addSchema(userSchema);
  fastify.addSchema(paymentSchema);
  fastify.addSchema(transactionSchema);

// Run the server
const start = async () => {
  try {


    // Swagger Docs
    await fastify.register(fastifySwagger, swaggerConfig);
    await fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });

    // API Endpoint routes
    await fastify.register(async api => {
      api.register(usersRoutes, { prefix: "/users" });
      api.register(paymentsRoutes, { prefix: "/users/payments" });
      api.register(transactionsRoutes, { prefix: "/transactions" });
    }, { prefix: "/api/v1" });


    await fastify.listen(3000);
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

