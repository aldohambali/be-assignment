import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function getPayments(request: FastifyRequest<CrudAllRequest>, reply: FastifyReply) {
  const { take, from } = request.query;

  let results = await prisma.payment.findMany({
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

export async function getPayment(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  let payment = await prisma.payment.findUnique({
    where: { id },
  });

  if (!payment) {
    return reply.status(404).send({ message: 'Payment not found' });
  }

  return reply.status(200).send(payment);
}

export async function deletePayment(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  await prisma.payment.delete({
    where: { id },
  });

  return reply.status(200).send({ message: 'Payment deleted' });
}

export async function createPayment(request: FastifyRequest<PostPayment>, reply: FastifyReply) {
  const {   
    user_id, 
    card_number, 
    card_type,
    expired,  
    cvv
  } = request.body;

  let payment = await prisma.payment.create({
    data: {
        user_id, 
        card_number, 
        card_type,
        expired,  
        cvv
    },
  });

  return reply.status(201).send(payment);
}

export async function updatePayment(request: FastifyRequest<PutPayment>, reply: FastifyReply) {
    const {   
        user_id, 
        card_number, 
        card_type,
        expired,  
        cvv
      } = request.body;
  const { id } = request.params;

  let payment = await prisma.payment.update({
    where: { id },
    data: {
        user_id, 
        card_number, 
        card_type,
        expired,  
        cvv
    },
  });

  return reply.status(200).send(payment);

}

