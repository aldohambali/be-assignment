import { FastifyInstance } from "fastify";
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';


const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const app = fastify();

export async function users(app: FastifyInstance) {

    //CRUD

    app.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        reply.send(users);
    });

    app.post<{ Body: IUserBodyParam } >('/user', async (request) => {
        const { name, username, email, password } = request.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log('hashedPassword' , hashedPassword)

        const user =  await prisma.user.create({
          data: {
              name: name,
              username: username,
              email: email,
              password: hashedPassword
          }
        })
        return user

    })

    app.get <{ Params: IByIdParam }>('/user/:id', async (request, reply) => {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) }
      });
      reply.send(user);
    });

    app.put<{ Body: IUserBodyParam; Params: IByIdParam }>(
      '/user/:id',
      async (request, reply) => {
        const { id } = request.params;
        const { name, username,email , password } = request.body;

        console.log('pass')

        console.log('password : ',password)

        if(password){

          const hashedPassword = await bcrypt.hash(password, saltRounds)
          const user =  await prisma.user.update({
            where: { id: Number(id) },
            data: {
              name, 
              username, 
              email,
              password:hashedPassword
            }
          })
          reply.send(user);

        } else {
          const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {
              name, 
              username, 
              email,
              password 
            },
          });
          reply.send(user);
        }
        
      }
    );

    app.delete <{ Params: IByIdParam } >('/user/:id',async (request, reply) => {
      const { id } = request.params;
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      reply.status(200).send({ message: 'User deleted' });
    });


    // login


}