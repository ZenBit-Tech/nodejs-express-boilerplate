const passport = require('passport')

const { GOOGLE_SUCCESS_REDIRECT, GOOGLE_FAILURE_REDIRECT } = process.env

module.exports = (req, res, next) => {
  passport.authenticate('google', function(err, user, info) {
    if (err) {
      res.redirect(
        GOOGLE_FAILURE_REDIRECT +
          '?error_message=' +
          JSON.stringify(err.message || err)
      )
      return next(err)
    }

    if (!user) {
      return res.redirect(
        GOOGLE_FAILURE_REDIRECT +
          '?error_message=' +
          JSON.stringify(info.message)
      )
    }

    res.redirect(GOOGLE_SUCCESS_REDIRECT + '?user=' + JSON.stringify(user))
  })(req, res, next)
}
