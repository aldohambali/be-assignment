
import { FastifyInstance } from "fastify";
// import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: [
        'query', 
        // 'info', 
        // 'warn', 
        'error'
    ],
});
// const app = fastify();

export async function transactions(app: FastifyInstance) {

    app.post<{ Body: ITransactionBodyParam } >('/transaction', async (request) => {
        const { title, amount, currency, status, payment_id, to_address } = request.body;

        const transaction =  await prisma.transaction.create({
          data: {
            title: title, 
            amount : amount, 
            currency : currency,
            status: 'pending',  //status : status,
            payment_id : payment_id,
            to_address : to_address
          }
        })
        return transaction
    })

    app.get <{ Params: IByIdTransactionParam }>('/transaction/:id', async (request, reply) => {
      const { id } = request.params;
      const transaction = await prisma.transaction.findMany({
        where: { id: Number(id) }
      });
      reply.send(transaction);
    });

    app.put<{ Body: ITransactionBodyParam; Params: IByIdTransactionParam }>(
      '/transaction/:id',
      async (request, reply) => {
        const { id } = request.params;
        const { title, amount, currency, status, payment_id, to_address } = request.body;


        const transaction = await prisma.transaction.update({
          where: { id: Number(id) },
          data: {
            title, amount, currency, status, payment_id, to_address
          },
        });
        reply.send(transaction);
        
      }
    );

    app.delete <{ Params: IByIdTransactionParam } >('/transaction/:id',async (request, reply) => {
      const { id } = request.params;
      await prisma.transaction.delete({
        where: { id: Number(id) },
      });
      reply.status(200).send({ message: 'Transaction deleted' });
    });


    //send
    app.put<{ Body: ITransactionBodyParam; Params: IByIdTransactionParam  } >('/transaction/send/:id', async (request, reply) => {
        // let transaction = { amount: 100, currency: 'USD' };
        await new Promise(resolve => setTimeout(resolve, 3000));

        const { id } = request.params;
        const { title, amount, currency, status, payment_id, to_address, status_updated } = request.body;

        const transaction = await prisma.transaction.update({
            where: { id: Number(id) },
            data: {
              status:'complete_send',
              amount,
              currency,
              status_updated: new Date()
            },
          });
          reply.send(transaction);  
  
        return transaction
    })

    //withdraw

    app.put<{ Body: ITransactionBodyParam; Params: IByIdTransactionParam  } >('/transaction/withdraw/:id', async (request, reply) => {
        // let transaction = { amount: 100, currency: 'USD' };
        await new Promise(resolve => setTimeout(resolve, 3000));

        const { id } = request.params;
        const { title, amount, currency, status, payment_id, to_address, status_updated } = request.body;

        const transaction = await prisma.transaction.update({
            where: { id: Number(id) },
            data: {
              status:'complete_withdraw',
              amount,
              currency,
              status_updated: new Date()
            },
          });
          reply.send(transaction);  
  
        return transaction
    })

}


