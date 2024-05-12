import { FastifyInstance } from "fastify";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "../controllers/payments.controllers";
import { createSchema, deleteSchema, getAllSchema, getSchema, updateSchema } from "../schema/payments.schema";

export default async function (fastify: FastifyInstance) {
  fastify.get('/', { schema: getAllSchema }, getPayments);

  fastify.get('/:id', { schema: getSchema }, getPayment);

  fastify.delete('/:id', { schema: deleteSchema }, deletePayment);

  fastify.post('/', { schema: createSchema }, createPayment);

  fastify.put('/:id', { schema: updateSchema }, updatePayment);
}

