'use strict';
const { authentication } = require('./middleware/auth');
const diplomas = require('../controllers/bscl-lecturers');
const diplomas = require('../controllers/bscl-students');

const asyncFunction = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = (app) => {
  app.post('/api/verify', asyncFunction(diplomas.verify));

  app.post('/api/validate', authentication, asyncFunction(diplomas.validate));

  app.post('/api/get/:NIM', authentication, asyncFunction(diplomas.get));
};
