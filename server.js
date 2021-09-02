'use strict';

const hof = require('hof');

const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;

const app = hof(settings);

module.exports = app;
