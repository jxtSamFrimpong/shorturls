const loginRouter = require('express').Router()
const loginController = require('../contollers/loginController')

loginRouter.post('/',loginController)


module.exports = loginRouter;