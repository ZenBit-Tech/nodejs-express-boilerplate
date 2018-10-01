const AuthManager = require('../../Managers/auth.manager')

module.exports = async (req, res, next) => {
  try {
    await AuthManager.loginWithEmailPassword(
      req.body.email,
      req.body.password,
      (status, body) => {
        res.status(status).send(body)

        next()
      }
    )
  } catch (err) {
    next('error', err)
  }
}
