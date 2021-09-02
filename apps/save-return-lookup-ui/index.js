'use strict';

const result = require('./behaviours/result');
const config = require('../../config');

module.exports = {
  name: 'save-return-lookup-ui',
  baseUrl: '/',
  steps: {
    '/type-of-query': {
      fields: ['query'],
      forks: [{
        target: '/session',
        condition: {
          field: 'query',
          value: 'session'
        }
      }, {
        target: '/email',
        condition: {
          field: 'query',
          value: 'email'
        }
      }]
    },
    '/session': {
      fields: ['session'],
      next: '/result'
    },
    '/email': {
      fields: ['email'],
      next: '/result'
    },
    '/result': {
      behaviours: [result, 'complete'],
      template: `${config.serviceType}-results`,
      next: '/'
    }
  }
};
