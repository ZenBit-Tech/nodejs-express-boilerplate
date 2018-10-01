const passport = require('passport')

const { GOOGLE_FAILURE_REDIRECT, LINKEDIN_FAILURE_REDIRECT } = process.env

const UserManager = require('../../Managers/user.manager')

const StrategiesManager = require('./strategies.manager')

passport.serializeUser((data, done) => {
  done(null, data.me._id)
})

passport.deserializeUser((id, done) => {
  UserManager.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(StrategiesManager.getGoogleStrategy())
passport.use(StrategiesManager.getLinkedInStrategy())

const authGoogleMiddleware = passport.authenticate('google', {
  failureRedirect: GOOGLE_FAILURE_REDIRECT,
  scope: ['profile', 'email'],
  session: false
})

const linkedinAuthMiddleware = passport.authenticate('linkedin', {
  failureRedirect: LINKEDIN_FAILURE_REDIRECT,
  scope: ['r_basicprofile', 'r_emailaddress'],
  session: false
})

module.exports = {
  authGoogleMiddleware,
  linkedinAuthMiddleware
}
