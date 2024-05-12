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
    tags: ['users'],
    description: 'List all user, paginated using a cursor paginator.',
    response: {
      200: {
        type: 'object',
        properties: {
          results: { type: 'array', items: { $ref: 'userSchema#' } },
        }
      },
      404: { $ref: 'messageResponseSchema#' },
    },
  };
  
  // GET '/:id'
  export const getSchema = {
    params:{ $ref: 'paramIdSchema' },
    tags: ['users'],
    description: 'Get a single user',
    response: {
      200: { $ref: 'userSchema#' },
      404: { $ref: 'messageResponseSchema#' },
    }
  };
  
  // DELETE '/:id'
  export const deleteSchema = {
    params:{ $ref: 'paramIdSchema' },
    tags: ['users'],
    description: 'Removes an especific user from the collection',
    response: {
      200: { $ref: 'messageResponseSchema#' },
      404: { $ref: 'messageResponseSchema#' },
    }
  };

  // POST '/'
  export const createSchema = {
    tags: ['users'],
    description: 'Creates a new User',
    body: {
      type: 'object',
      required: ['email', 'username', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
      }
    },
    response: {
      200: { $ref: 'userSchema#' },
      404: { $ref: 'messageResponseSchema#' },
    }
  };
  
  // PUT: '/:id'
  export const updateSchema = {
    tags: ['users'],
    description: 'Updates a User',
    params:{ $ref: 'paramIdSchema#' },
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
      }
    },
    response: {
      200: { $ref: 'userSchema#' },
      404: { $ref: 'messageResponseSchema#' },
    }
  };
  
  