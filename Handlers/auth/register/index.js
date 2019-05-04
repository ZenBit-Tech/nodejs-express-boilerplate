const AuthManager = require('../../../Managers/auth.manager')

const { validationSchema } = require('./config')

module.exports.validation = {
  validationSchema,
}

module.exports.handler = async (req, res, next) => {
  try {
    const newUser = await AuthManager.registerByEmailPassword(req.body)

    res.status(200).send(newUser)
  } catch (err) {
    next(err)
  }
}
