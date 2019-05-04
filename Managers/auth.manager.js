const UserManager = require('./user.manager')
const SessionManager = require('./session.manager')

const _ = require('lodash')

class AuthManager {
  async loginWithEmailPassword(email, password) {
    const user = await UserManager.findByEmail(email)

    logger.debug(user)

    if (!user) {
      throw {
        code: 'UserDoesntExist',
        message: 'User doesn`t exist',
        userMessage: 'Such user doesn`t exist',
      }
    }

    if (user.password === '' && user.registrationType !== 'local') {
      throw {
        code: 'SocialSignIn',
        message: 'Sign in with social',
        userMessage: 'Sign in with ' + _.capitalize(user.registrationType),
      }
    }

    if (!user.comparePassword(password)) {
      throw {
        code: 'InvalidPassword',
        message: 'Invalid password',
        userMessage: 'Invalid password',
      }
    }

    // const { session, refreshToken } = await SessionManager.createSession(
    //   newUser,
    // )

    return {
      user: user.omitFields(),
      // session: session,
    }
  }

  async registerByEmailPassword(newUserData) {
    const newUser = await UserManager.createUser(newUserData)

    if (newUser.error) {
      throw {
        code: newUser.error,
        message: '',
        userMessage: '',
      }
    }

    // const { session, refreshToken } = await SessionManager.createSession(
    //   newUser,
    // )

    return {
      user: newUser.omitFields(),
      // session: session,
    }
  }
}

module.exports = new AuthManager()
module.exports.AuthManager = AuthManager
