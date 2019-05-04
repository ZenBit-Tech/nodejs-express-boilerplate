const _ = require('lodash')
const path = require('path')
const cron = require('cron')

const validationMiddleware = require('../Middlewares/validation.middleware')

const setupRoutes = (app, routes) => {
  const appDir = path.dirname(require.main.filename)

  logger.info('Avaliable routes:')
  logger.logStart()

  let routesAvaliable = []
  const keys = Object.keys(routes)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const route = routes[key]

    try {
      const { events, handler: handlerPath, middleware } = route

      const additionalProps = []

      if (_.isString(handlerPath)) {
        const routeHandlerFullPath = path.join(appDir, handlerPath)
        const routeHandlerData = require(routeHandlerFullPath)

        const handlerFunc = routeHandlerData.handler

        const handlerValidationData = routeHandlerData.validation
        const handlerMiddleware = routeHandlerData.middleware

        if (_.isArray(handlerMiddleware)) {
          additionalProps.concat(handlerMiddleware)
        }

        if (handlerValidationData) {
          const routeValidationMiddleware = (req, res, next) =>
            validationMiddleware(req, res, next, handlerValidationData)

          additionalProps.push(routeValidationMiddleware)
        }

        additionalProps.push(handlerFunc)
      } else if (_.isFunction(handler)) {
        additionalProps.push(handlerPath)
      }

      if (_.isObject(events.http)) {
        const method = events.http.method.toLowerCase()
        const middlewareArr = middleware || []

        app[method](events.http.path, ...middlewareArr, ...additionalProps)
        routesAvaliable.push({
          function: key,
          method: events.http.method.toUpperCase(),
          path: events.http.path,
        })
      }

      if (_.isObject(events.shedule)) {
        const { rate, enabled } = events.shedule

        if (!enabled) continue

        const sheduleJob = new cron.CronJob(rate, handlerFunc)

        sheduleJob.start()
        routesAvaliable.push({
          function: key,
          method: 'SHEDULE',
          path: rate,
        })
      }
    } catch (error) {
      logger.error(`setupRoutes \n route: ${key} \n`, route, ` \n`, error.stack)
    }
  }

  /* eslint-disable-next-line */
  console.table(routesAvaliable)
  logger.logEnd()
}

module.exports.setupRoutes = setupRoutes
