/*
* Some global schemas, representing our stuff from the Database.
* These will be used mostly when serializing data in our responses.
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

export const userSchema = {
    $id: 'userSchema',
    type: 'object',
    required: ['email','username','password'],
    // nullable: true,
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
    //   createdAt: { type: 'string', format: 'date-time' },
    //   updatedAt: { type: ['string', 'null'], format: 'date-time' },
    //   payments: { type: 'array', items: { $ref: 'productSchema#' } },
    },
  };


  export const paymentSchema = {
    $id: 'paymentSchema',
    type: 'object',
    required: ['card_number','card_type','user_id'],
    properties: {
      id: { type: 'number' },
      user_id: { type: 'number' },
      card_number: { type: 'string' },
      card_type: { type: 'string' },
      expired: { type: 'string' },
      cvv: { type: 'string' },
    },
  };


  export const transactionSchema = {
    $id: 'transactionSchema',
    type: 'object',
    required: ['payment_id','title', 'currency', 'amount' ],
    properties: {
      id: { type: 'string' },
      created: { type: ['string'], format: 'date-time' },
      title: { type: 'string' },
      amount: { type: 'number' },
      currency: { type: 'string' },
      payment_id: { type: 'number' },
      to_address: { type: 'string' },
      status: { type: 'string' },
      status_updated: { type: ['string'], format: 'date-time' }
    }
  };
  