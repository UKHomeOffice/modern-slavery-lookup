'use strict';

const config = require('../../../config');
const knexfile = require(`${config.migrationsRepo}`);
const knexfileConfig = knexfile[process.env.NODE_ENV ? 'production' : 'development'];
const tableName = config.tableName;
const knex = require('knex')(knexfileConfig);

const selectableProps = [
  'id',
  'session',
  'created_at',
  'updated_at'
];

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    if (req.sessionModel.get('session')) {
      knex.select(selectableProps)
        .from(tableName)
        .whereRaw(`LOWER(session::TEXT) LIKE LOWER('%${req.sessionModel.get('session')}%')`)
        .then(reports => {
          const reportsList = [];

          reports.forEach(report => {
            delete report.session['csrf-secret'];
            delete report.session.steps;
            if (Object.values(report.session).find(element => {
              if (typeof element === 'string') {
                return element.includes(req.sessionModel.get('session'));
              }
              return false;
            })) {
              reportsList.push({
                session: report.session,
                createdAt: report.created_at,
                updatedAt: report.updated_at
              });
            }
          });

          req.sessionModel.set('result', reportsList);
          req.sessionModel.set('resultLength', reportsList.length);
          req.sessionModel.set('querytext', req.sessionModel.get('session'));

          super.getValues(req, res, next);
        });
    } else {
      // apostrophes in emails need to be doubled up in order to escape them in SQL
      const email = req.sessionModel.get('email').replace("'", "''");

      knex.select(selectableProps)
        .from(tableName)
        .whereRaw(`LOWER(email) LIKE LOWER('%${email}%')`)
        .then(reports => {
          const reportsList = [];

          reports.forEach(report => {
            reportsList.push({
              session: report.session,
              createdAt: report.created_at,
              updatedAt: report.updated_at
            });
          });

          req.sessionModel.set('result', reportsList);
          req.sessionModel.set('resultLength', reportsList.length);
          req.sessionModel.set('querytext', req.sessionModel.get('email'));

          super.getValues(req, res, next);
        });
    }
  }
};
