const express = require('express')
const configs = require('./Config/server')

// const { createDBConnection } = require('./DB')

const { setupRoutes } = require('./Libs/router.lib')
const routes = require('./routes')

// const middleware
const bodyParser = require('body-parser')
const corsMiddleware = require('./Middlewares/cors.middleware')
const reqStartMiddleware = require('./Middlewares/req_start.middleware')
const reqEndMiddleware = require('./Middlewares/req_end.middleware')
const handleErrorsMiddleware = require('./Middlewares/errorHandler.middleware')

require('console.table')
require('./Libs/logger.lib')

const app = express()
const server = require('http').Server(app)

// apply middleware
app.use(
  bodyParser.json({
    type: 'application/json'
  })
)
app.use(corsMiddleware)
app.use(reqStartMiddleware)

// connection to the database
// createDBConnection();

// server start
server.listen(configs.http.port, () => {
  console.clear()

  /* global logger */
  logger.event('server starts at port ', configs.http.port)

  // init routes
  setupRoutes(app, routes)

  app.use(handleErrorsMiddleware)
  app.use(reqEndMiddleware)
})
