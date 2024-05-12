import { FastifyInstance } from "fastify";

import { getAllSchema, getSchema, deleteSchema, createSchema, updateSchema } from "../schema/users.schema";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.controllers";

export default async function (fastify: FastifyInstance) {
  fastify.get('/', { schema: getAllSchema }, getUsers);

  fastify.get('/:id', { schema: getSchema }, getUser);

  fastify.delete('/:id', { schema: deleteSchema }, deleteUser);

  fastify.post('/', { schema: createSchema }, createUser);

  fastify.put('/:id', { schema: updateSchema }, updateUser);
}

