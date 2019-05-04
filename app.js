require('console.table')
require('./Libs/logger.lib')
require('./Libs/passport')

const express = require('express')
// const session = require('express-session')
const configs = require('./Config/server')

const { createDBConnection } = require('./DB').mongodb

const { setupRoutes } = require('./Libs/router.lib')
const routes = require('./routes')

// const middleware
const bodyParser = require('body-parser')
const corsMiddleware = require('./Middlewares/cors.middleware')
const reqStartMiddleware = require('./Middlewares/req_start.middleware')
const reqEndMiddleware = require('./Middlewares/req_end.middleware')
const handleErrorsMiddleware = require('./Middlewares/errorHandler.middleware')

const app = express()
const server = require('http').Server(app)

app.set('trust proxy', 1) // trust first proxy

// apply middleware
app.use(
  bodyParser.json({
    type: 'application/json'
  })
)
app.use(corsMiddleware)
app.use(reqStartMiddleware)
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// connection to the database
createDBConnection()

// server start
server.listen(configs.http.port, () => {
  // console.clear()

  /* global logger */
  logger.event('server starts at port ', configs.http.port)

  // init routes
  setupRoutes(app, routes)

  app.use(handleErrorsMiddleware)
  app.use(reqEndMiddleware)
})
