'use strict';

// Update with your config settings.
module.exports = {
  tableName: process.env.TABLE_NAME || 'reports',
  development: {
    client: process.env.CLIENT || 'postgresql',
    connection: {
      database: 'knex_session',
      user: 'knex',
      password: 'knex'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_data_service'
    }
  },
  production: {
    client: process.env.CLIENT || 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_data_service'
    }
  }
};
