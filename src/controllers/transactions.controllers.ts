import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export async function getTransactions(request: FastifyRequest<CrudAllRequest>, reply: FastifyReply) {
  const { take, from } = request.query;

  let results = await prisma.transaction.findMany({
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

export async function getTransaction(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  let transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    return reply.status(404).send({ message: 'Transaction not found' });
  }

  return reply.status(200).send(transaction);
}

export async function deleteTransaction(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  await prisma.transaction.delete({
    where: { id },
  });

  return reply.status(200).send({ message: 'Transaction deleted' });
}

export async function createTransaction(request: FastifyRequest<PostTransaction>, reply: FastifyReply) {
  const {   
    title, 
    amount, 
    currency,
    payment_id,  
    to_address,
    // status,
    // status_updated
  } = request.body;


  let transaction = await prisma.transaction.create({
    data: {
        title, 
        amount, 
        currency,
        payment_id,  
        to_address,
        created: new Date(),
        status: 'pending',  //status : status,
        // status,
        // status_updated
    },
  });

  return reply.status(201).send(transaction);
}

export async function updateTransaction(request: FastifyRequest<PutTransaction>, reply: FastifyReply) {
    const {   
        title, 
        amount, 
        currency,
        payment_id,  
        to_address,
        // status,
        // status_updated
      } = request.body;
  const { id } = request.params;

  let transaction = await prisma.transaction.update({
    where: { id },
    data: {
        title, 
        amount, 
        currency,
        payment_id,  
        to_address,
        // status,
        // status_updated
    },
  });

  return reply.status(200).send(transaction);

}

//send
export async function sendTransaction(request: FastifyRequest<PutTransaction>, reply: FastifyReply) {

  const {   
    title, 
    amount, 
    currency,
    payment_id,  
    to_address,
    // status,
    // status_updated
  } = request.body;


  const { id } = request.params;

  //process checking bank / 3rd party payment.. 10s
  await new Promise(resolve => setTimeout(resolve, 10000)); //30000


  let transaction = await prisma.transaction.update({
    where: { id },
    data: {
        amount,
        currency,
        status_updated: new Date(),
        status:'complete_send',
    },
  });

  return reply.status(201).send(transaction);
}



//withdraw
export async function withdrawTransaction(request: FastifyRequest<PutTransaction>, reply: FastifyReply) {

  const {   
    title, 
    amount, 
    currency,
    payment_id,  
    to_address,
    // status,
    // status_updated
  } = request.body;


  const { id } = request.params;

  //process checking bank / 3rd party payment.. 10s
  await new Promise(resolve => setTimeout(resolve, 10000)); //30000

  let transaction = await prisma.transaction.update({
    where: { id },
    data: {
        amount,
        currency,
        status_updated: new Date(),
        status:'complete_withdraw',
    },
  });

  return reply.status(201).send(transaction);
}
