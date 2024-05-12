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
  tags: ['payments'],
  description: 'List all payments, paginated using a cursor paginator.',
  response: {
    200: {
      type: 'object',
      properties: {
        results: { type: 'array', items: { $ref: 'paymentSchema#' } },
      }
    },
    404: { $ref: 'messageResponseSchema#' },
  },
};

// GET '/:id'
export const getSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['payments'],
  description: 'Get a single payment',
  response: {
    200: { $ref: 'paymentSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// DELETE '/:id'
export const deleteSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['payments'],
  description: 'Removes an especific payment from the collection',
  response: {
    200: { $ref: 'messageResponseSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// POST '/'
export const createSchema = {
  tags: ['payments'],
  description: 'Creates a new Payment \ncard_type example = "Credit Card" / "Debit Card" / "Loan"',
  body: {
    type: 'object',
    required: ['user_id', 'card_number', 'card_type'],
    properties: {
        user_id: { type: 'number' },
        card_number: { type: 'string' },
        card_type: { type: 'string' },
        expired: { type: 'string' },
        cvv: { type: 'string' }
    }
  },
  response: {
    200: { $ref: 'paymentSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// PUT: '/:id'
export const updateSchema = {
  tags: ['payments'],
  description: 'Updates a Payment',
  params:{ $ref: 'paramIdSchema#' },
  body: {
    type: 'object',
    required: ['user_id', 'card_number', 'card_type'],
    properties: {
        user_id: { type: 'number' },
        card_number: { type: 'string' },
        card_type: { type: 'string' },
        expired: { type: 'string' },
        cvv: { type: 'string' }
    }
  },
  response: {
    200: { $ref: 'paymentSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

