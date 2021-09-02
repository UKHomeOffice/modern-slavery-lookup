'use strict';

const hof = require('hof');

const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;

const app = hof(settings);

// Backend API for managing records
require('./api');
// Alerts service watching table name
require('./alerts');

module.exports = app;
