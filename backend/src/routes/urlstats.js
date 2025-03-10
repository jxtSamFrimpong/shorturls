const express = require('express')
const UrlStatsRouter = express.Router()
const urlStatsController = require('../contollers/urlStatsController')
const decodeAuthToken = require('../middlewares/auth/decodeAuthToken')

UrlStatsRouter.use(decodeAuthToken)
UrlStatsRouter.get('/:shorturl', urlStatsController)

module.exports = UrlStatsRouter;