const fs = require('fs')
const _ = require('lodash')

const GoogleStrategy = require('passport-google-oauth20').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const UserManager = require('../../Managers/user.manager')
const SessionManager = require('../../Managers/session.manager')

const handleExistingUserLogin = async (user, done) => {
  const { session, refreshToken } = await SessionManager.createSession(user)

  done(null, {
    user: user.omitFields(),
    session: session,
    refreshToken,
  })
}

const handleNewUserLogin = async (profile, done) => {
  logger.debug(profile)
  const accountEmail = _.find(profile.emails, email => email.type === 'account')

  const email =
    (accountEmail && accountEmail.value) ||
    profile.emailAddress ||
    profile.emails[0].value

  const existingUser = (await UserManager.findOne({ email })) || null

  if (existingUser) {
    let message = 'Email already in use. Sign in with '

    if (user.registrationType !== 'local') {
      message += _.capitalize(user.registrationType)

      if (user.password !== '') {
        message += ' or email and password'
      }
    } else {
      message += 'email and password'
    }

    return done(null, false, {
      message,
      userMessage: message,
    })
  }

  const newUserData = {
    email,
    registrationType: profile.provider,
    socialId: profile.id,
    name: profile.displayName,
  }

  const newUser = await UserManager.createUser(newUserData)

  if (newUser.error) {
    return done(null, false, { error: newUser.error })
  }

  const { session, refreshToken } = await SessionManager.createSession(newUser)

  done(200, {
    user: newUser.omitFields(),
    session: session,
    refreshToken,
  })
}

class PassportManager {
  static getGoogleStrategy() {
    const { GOOGLE_CREDENTIALS_PATH } = process.env
    const credentialsFile = fs.readFileSync(GOOGLE_CREDENTIALS_PATH)
    const credentials = JSON.parse(credentialsFile)

    return new GoogleStrategy(
      {
        clientID: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        callbackURL: '/api/v1/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          logger.info(profile)
          const existingUser =
            (await UserManager.findOne({
              registrationType: profile.provider,
              socialId: profile.id,
            })) || null

          if (existingUser) handleExistingUserLogin(existingUser, done)
          else handleNewUserLogin(profile, done)
        } catch (err) {
          done(null, false, err)
        }
      },
    )
  }

  static getLinkedInStrategy() {
    const { LINKEDIN_CREDENTIALS_PATH } = process.env
    const credentialsFile = fs.readFileSync(LINKEDIN_CREDENTIALS_PATH)
    const credentials = JSON.parse(credentialsFile)

    return new LinkedInStrategy(
      {
        clientID: credentials.client_id,
        clientSecret: credentials.client_secret,
        callbackURL: 'http://localhost:8080/api/v1/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
      },
      async (token, tokenSecret, profile, done) => {
        try {
          const existingUser =
            (await UserManager.findOne({
              registrationType: profile.provider,
              socialId: profile.id,
            })) || null

          if (existingUser) handleExistingUserLogin(existingUser, done)
          else handleNewUserLogin(profile, done)
        } catch (err) {
          done(null, false, err)
        }
      },
    )
  }
}

module.exports = PassportManager
