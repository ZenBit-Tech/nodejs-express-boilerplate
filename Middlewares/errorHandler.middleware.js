const _ = require('lodash')

module.exports = function(err, req, res, next) {
  if (!_.isEmpty(err.stack)) {
    logger.error('err handler middleware', err.stack)

    res.status(500).send({ status: false })
  }

  next()
}
