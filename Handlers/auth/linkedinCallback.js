const passport = require('passport')

const { LINKEDIN_SUCCESS_REDIRECT, LINKEDIN_FAILURE_REDIRECT } = process.env

module.exports = (req, res, next) => {
  passport.authenticate('linkedin', function(err, user, info) {
    if (err) {
      res.redirect(
        LINKEDIN_FAILURE_REDIRECT +
          '?error_message=' +
          JSON.stringify(err.message || err),
      )
      return next(err)
    }

    if (!user) {
      return res.redirect(
        LINKEDIN_FAILURE_REDIRECT +
          '?error_message=' +
          JSON.stringify(info.message),
      )
    }

    res.redirect(LINKEDIN_SUCCESS_REDIRECT + '?user=' + JSON.stringify(user))
  })(req, res, next)
}
