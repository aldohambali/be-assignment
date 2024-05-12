/*
* Schemas used for Validation and Validation and Serialization of our routes/endpoints
*
* These are used to:
*  - Validate incoming requests (URL params, body, headers, query string)
*  - Automatically serialize the response objects
*  - Also, Swagger uses these schemas to generate the documentation!
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

// GET '/'
export const getAllSchema = {
  querystring: { $ref: 'paginationSchema' },
  tags: ['transactions'],
  description: 'List all transactions, paginated using a cursor paginator.',
  response: {
    200: {
      type: 'object',
      properties: {
        results: { type: 'array', items: { $ref: 'transactionSchema#' } },
      }
    },
    404: { $ref: 'messageResponseSchema#' },
  },
};

// GET '/:id'
export const getSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['transactions'],
  description: 'Get a single transaction',
  response: {
    200: { $ref: 'transactionSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// DELETE '/:id'
export const deleteSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['transactions'],
  description: 'Removes an especific transactions from the collection',
  response: {
    200: { $ref: 'messageResponseSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// POST '/'
export const createSchema = {
  tags: ['transactions'],
  description: 'Creates a new Transactions\nAll transaction status will be "pending" at first. \nThen continue hit API "send" / "widthdraw" below',
  body: {
    type: 'object',
    required: ['title', 'amount', 'currency','payment_id'],
    properties: {
        title: { type: 'string' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        payment_id: { type: 'number' },
        to_address: { type: 'string' },
        // status: { type: 'string' },
        // status_updated: { type: 'Date' }
    }
  },
  response: {
    200: { $ref: 'transactionSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// PUT: '/:id'
export const updateSchema = {
  tags: ['transactions'],
  description: 'Updates a Transactions',
  params:{ $ref: 'paramIdSchema#' },
  body: {
    type: 'object',
    required: ['amount', 'currency'],
    properties: {
        // title: { type: 'string' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        // payment_id: { type: 'number' },
        // to_address: { type: 'string' },
        // status: { type: 'string' },
        // status_updated: { type: 'Date' }
    }
  },
  response: {
    200: { $ref: 'transactionSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};


// PUT: '/:id'
export const sendSchema = {
  tags: ['transactions'],
  description: 'Updates a Transaction status to "complete_send"',
  params:{ $ref: 'paramIdSchema#' },
  body: {
    type: 'object',
    required: ['amount', 'currency'],
    properties: {
        // title: { type: 'string' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        // payment_id: { type: 'number' },
        // to_address: { type: 'string' },
        // status: { type: 'string' },
        // status_updated: { type: 'Date' }
    }
  },
  response: {
    200: { $ref: 'transactionSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};


// PUT: '/:id'
export const withdrawSchema = {
    tags: ['transactions'],
    description: 'Updates a Transaction status to "complete_withdraw"',
    params:{ $ref: 'paramIdSchema#' },
    body: {
      type: 'object',
      required: ['amount', 'currency'],
      properties: {
          // title: { type: 'string' },
          amount: { type: 'number' },
          currency: { type: 'string' },
          // payment_id: { type: 'number' },
          // to_address: { type: 'string' },
          // status: { type: 'string' },
          // status_updated: { type: 'Date' }
      }
    },
    response: {
      200: { $ref: 'transactionSchema#' },
      404: { $ref: 'messageResponseSchema#' },
    }
};
