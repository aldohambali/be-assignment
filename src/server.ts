const fastify = require('fastify')({ logger: true });
import { payments } from "./routes/payments";
import { transactions } from "./routes/transactions";
import { users } from "./routes/users";



// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.register(users)
fastify.register(payments)
fastify.register(transactions)


// Run the server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

