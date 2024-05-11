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

export async function payments(app: FastifyInstance) {

    app.post<{ Body: IPaymentBodyParam } >('/payment', async (request) => {
        const { user_id, card_number, card_type, expired, cvv } = request.body;

        const payment =  await prisma.payment.create({
          data: {
                user_id: user_id, 
                card_number : card_number, 
                card_type : card_type,
                expired: expired,
                cvv : cvv
          }
        })
        return payment
    })

    app.get <{ Params: IByIdPaymentParam }>('/payment/:id', async (request, reply) => {
      const { id } = request.params;
      const payment = await prisma.payment.findMany({
        where: { id: Number(id) }
      });
      reply.send(payment);
    });

    app.put<{ Body: IPaymentBodyParam; Params: IByIdPaymentParam }>(
      '/payment/:id',
      async (request, reply) => {
        const { id } = request.params;
        const { user_id, card_number, card_type, expired, cvv } = request.body;


        const payment = await prisma.payment.update({
          where: { id: Number(id) },
          data: {
            user_id, card_number, card_type, expired, cvv
          },
        });
        reply.send(payment);
        
      }
    );

    app.delete <{ Params: IByIdPaymentParam } >('/payment/:id',async (request, reply) => {
      const { id } = request.params;
      await prisma.payment.delete({
        where: { id: Number(id) },
      });
      reply.status(200).send({ message: 'Payment deleted' });
    });

}