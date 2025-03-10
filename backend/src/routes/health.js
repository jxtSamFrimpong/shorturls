const express = require('express');
const healthRouter = express.Router();
const HealthController = require('../contollers/health-controllers')

healthRouter.get('/', HealthController)


module.exports = healthRouter;