'use strict';

module.exports = {
  apiPort: process.env.API_PORT || 3000,
  tableName: process.env.TABLE_NAME || 'reports',
  serviceType: process.env.SERVICE_TYPE || 'modern-slavery'
};
