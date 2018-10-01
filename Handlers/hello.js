const AuthManager = require('../Managers/auth.manager')

module.exports = async (req, res, next) => {
  try {
    await AuthManager.registerByEmailPassword(
      {
        email: 'halleyjuffin@gmail.com',
        name: 'domin',
        password: 'password'
      },
      (status, body) => {
        res.status(status).send(body)

        next()
      }
    )
  } catch (err) {
    logger.error(err)
  }
}
