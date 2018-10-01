module.exports = (req, res, next) => {
  const moment = require('moment')()

  console.clear()
  logger.event(moment.format('HH:mm:ss'))
}
