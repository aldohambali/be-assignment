import { FastifyInstance } from "fastify";
import { createTransaction, deleteTransaction, getTransaction, getTransactions, sendTransaction, withdrawTransaction } from "../controllers/transactions.controllers";
import { createSchema, deleteSchema, getAllSchema, getSchema, sendSchema, updateSchema, withdrawSchema } from "../schema/transactions.schema";


export default async function (fastify: FastifyInstance) {
    fastify.get('/', { schema: getAllSchema }, getTransactions);

    fastify.get('/:id', { schema: getSchema }, getTransaction);

    fastify.delete('/:id', { schema: deleteSchema }, deleteTransaction);

    fastify.post('/', { schema: createSchema }, createTransaction);

    //   fastify.put('/:id', { schema: updateSchema }, updateTransaction);
  
    fastify.put('/send/:id', { schema: sendSchema }, sendTransaction);
    fastify.put('/withdraw/:id', { schema: withdrawSchema }, withdrawTransaction);

}

