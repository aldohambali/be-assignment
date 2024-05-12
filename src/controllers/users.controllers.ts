import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function getUsers(request: FastifyRequest<CrudAllRequest>, reply: FastifyReply) {
  const { take, from } = request.query;

  let results = await prisma.user.findMany({
    cursor: from ? { id: from } : undefined,
    skip: from ? 1 : undefined,
    take,
    orderBy: { id: 'desc' },
  });

  if (results.length === 0) {
    return reply.status(404).send({ message: "No elements found" });
  }

  return reply.status(200).send({ results });
}

export async function getUser(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  let user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  }

  return reply.status(200).send(user);
}

export async function deleteUser(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  await prisma.user.delete({
    where: { id },
  });

  return reply.status(200).send({ message: 'User deleted' });
}

export async function createUser(request: FastifyRequest<PostUser>, reply: FastifyReply) {
  const {   
    name, 
    username, 
    email,
    password  
  } = request.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  let user = await prisma.user.create({
    data: {
        name, 
        username, 
        email,
        password : hashedPassword
    },
  });

  return reply.status(201).send(user);
}

export async function updateUser(request: FastifyRequest<PutUser>, reply: FastifyReply) {
    const {   
        name, 
        username, 
        email,
        password  
      } = request.body;
  const { id } = request.params;

  if(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    let user = await prisma.user.update({
      where: { id },
      data: {
          name, 
          username, 
          email,
          password : hashedPassword  
      },
    });
  
    return reply.status(200).send(user);
  } else {
    let user = await prisma.user.update({
      where: { id },
      data: {
          name, 
          username, 
          email
      },
    });
  
    return reply.status(200).send(user);
  }

}

