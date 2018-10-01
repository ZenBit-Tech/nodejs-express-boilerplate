const _ = require('lodash')
const path = require('path')
const cron = require('cron')

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
      const { events, handler, middleware } = route

      const additionalProps = []

      if (_.isString(handler)) {
        const handlerPath = path.join(appDir, handler)
        const handlerFunc = require(handlerPath)

        additionalProps.push(handlerFunc)
      } else if (_.isFunction(handler)) {
        additionalProps.push(handler)
      }

      if (_.isObject(events.http)) {
        const method = events.http.method.toLowerCase()
        const middlewareArr = middleware || []

        app[method](events.http.path, ...middlewareArr, ...additionalProps)
        routesAvaliable.push({
          function: key,
          method: events.http.method.toUpperCase(),
          path: events.http.path
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
          path: rate
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
