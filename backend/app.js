const express = require('express')
//initialize app
const app = express()
const cors = require('cors')


//data models
const shorturls = require('./src/models/shorturls')
//db models and instances
const sync_db = require('./src/utils/sync-db')

//node middlewares
app.use(express.json())
app.use(cors())

//import custom middlewares
const unknownEndpoint = require('./src/middlewares/UnknownEndpoint')
const requestLogger = require('./src/middlewares/RequestLogger')
const errorHandler = require('./src/middlewares/errorHandler')

//Routes
const usersRouter = require('./src/routes/users')
const healthRouter = require('./src/routes/health')
const loginRouter = require('./src/routes/login')
const shortUrlsRouter = require('./src/routes/shorturls')
const UrlStatsRouter = require('./src/routes/urlstats')



//set some of custom middlewares as default
app.use(requestLogger)


app.use('/api/urls', shortUrlsRouter)


app.use('/api/urlstats', UrlStatsRouter)

app.use('/api/users', usersRouter)
app.use('/api/health', healthRouter)
app.use('/api/login', loginRouter)




app.use(unknownEndpoint)
app.use(errorHandler)


sync_db()

module.exports = app