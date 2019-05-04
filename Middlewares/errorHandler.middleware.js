const _ = require('lodash')

module.exports = function(err, req, res, next) {
  if (err.code) {
    res.status(400).send({
      code: err.code,
      message: err.message,
      userMessage: err.userMessage,
      description: err.description,
      details: err.details
    })

    return
  }

  if (!_.isEmpty(err.stack)) {
    logger.error('err handler middleware', err.stack)

    res.status(500).send({ status: false })
  }

  next()
}
