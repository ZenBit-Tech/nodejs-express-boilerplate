const UserManager = require('./user.manager')
const SessionManager = require('./session.manager')

const _ = require('lodash')

class AuthManager {
  static async loginWithEmailPassword(email, password, done) {
    try {
      const user = await UserManager.findByEmail(email)

      if (!user)
        return done(400, {
          message: 'User doesn`t exist',
          userMessage: 'Such user doesn`t exist'
        })

      if (user.password === '' && user.registrationType !== 'local') {
        return done(400, {
          message: 'Sign in with social',
          userMessage: 'Sign in with ' + _.capitalize(user.registrationType)
        })
      }

      if (!user.comparePassword(password))
        return done(400, {
          message: 'Invalid password',
          userMessage: 'Invalid password'
        })

      const { session, refreshToken } = await SessionManager.createSession(user)

      done(200, {
        user: user.omitFields(),
        session: session.lean(),
        refreshToken
      })
    } catch (err) {
      throw Error(err)
    }
  }

  static async registerByEmailPassword(newUserData, done) {
    try {
      const newUser = await UserManager.createUser(newUserData)

      if (newUser.error) {
        done(400, { error: newUser.error })

        return
      }

      const { session, refreshToken } = await SessionManager.createSession(
        newUser
      )

      done(200, {
        user: newUser.omitFields(),
        session: session,
        refreshToken
      })
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = AuthManager
