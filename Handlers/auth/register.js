const AuthManager = require('../../Managers/auth.manager')

module.exports = async (req, res, next) => {
  try {
    await AuthManager.registerByEmailPassword(req.body, (status, body) => {
      res.status(status).send(body)

      next()
    })
  } catch (err) {
    next('error', err)
  }
}
