const express = require('express');
const usersRouter = express.Router();
const validateUserCreationBody = require('../middlewares/users/createUser')
const {getUsers, getUser, createUser} = require('../contollers/UserControllers')
const decodeAuthToken = require('../middlewares/auth/decodeAuthToken')


usersRouter.get('/', [decodeAuthToken],getUsers)
usersRouter.get('/:id', [decodeAuthToken],getUser)
usersRouter.post('/', [validateUserCreationBody], createUser)

module.exports = usersRouter;