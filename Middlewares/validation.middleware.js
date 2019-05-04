const _ = require('lodash')

const validationMiddleware = (request, response, next, validationData) => {
  const {
    requestField = 'body',
    validationSchema = {},
    preprocessFunc,
  } = validationData

  let dataToValidate = _.get(request, requestField, {})

  if (!dataToValidate) {
    next({
      code: `Missing ${requestField}`,
    })
  }

  if (_.isFunction(preprocessFunc)) {
    dataToValidate = preprocessFunc(dataToValidate)
  }

  if (_.isFunction(validationSchema.validateSync)) {
    try {
      dataToValidate = validationSchema.validateSync(dataToValidate, {
        strict: true,
        abortEarly: false,
      })
    } catch (error) {
      if (error.name === 'ValidationError') {
        next({
          code: 'ValidationError',
          message: 'Bad Request',
          details: error.errors,
        })
      } else {
        next(error)
      }
    }
  }

  _.set(request, requestField, dataToValidate)

  next()
}

module.exports = validationMiddleware
