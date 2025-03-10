const shortUrlsRouter = require('express').Router()
const addNewShortURLs = require('../contollers/shorturls/addNewShortURLs')
const getAllShortURLS = require('../contollers/shorturls/getAllShortURLS')
const getSingleURLs = require('../contollers/shorturls/getSingleURLs')
const updateShortURLs = require('../contollers/shorturls/updateShortURLs')
const deleteShortURLs = require('../contollers/shorturls/deleteShortURLs')

const validateBodyForNewURLs = require('../middlewares/shorturls/validateBodyFornewURLs')
const decodeAuthToken = require('../middlewares/auth/decodeAuthToken')


shortUrlsRouter.use(decodeAuthToken)
shortUrlsRouter.post('/', [validateBodyForNewURLs],addNewShortURLs)
shortUrlsRouter.put('/:shorturl', updateShortURLs)
shortUrlsRouter.delete('/:shorturl', deleteShortURLs)
shortUrlsRouter.get('/:shorturl', getSingleURLs)
shortUrlsRouter.get('/', getAllShortURLS)


module.exports = shortUrlsRouter;