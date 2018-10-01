const { Session } = require('../DB').default

const JWT = require('jsonwebtoken')
const moment = require('moment')
// const redis = require("redis")

const {
  TOKEN_SECRET,
  TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES
} = process.env

const tokenConfig = {
  secret: TOKEN_SECRET,
  expires: TOKEN_EXPIRES
}

const refreshTokenConfig = {
  secret: REFRESH_TOKEN_SECRET,
  expires: REFRESH_TOKEN_EXPIRES
}

// const redisClient = redis.createClient
global.refreshTokens = {}

class SessionManager {
  static async createToken(user) {
    try {
      let config = tokenConfig

      const token = JWT.sign({ user: user._id }, config.secret, {
        expiresIn: config.expires
      })

      const expiredDate = moment()
        .add(config.expired)
        .valueOf()

      return { token, expiredDate }
    } catch (err) {
      throw Error(err)
    }
  }

  static async createRefreshToken(session) {
    try {
      let config = refreshTokenConfig

      const refreshToken = JWT.sign({ session: session._id }, config.secret)

      return { refreshToken }
    } catch (err) {
      throw Error(err)
    }
  }

  static async createSession(user) {
    try {
      const { token, expiredDate } = await this.createToken(user)

      const session = new Session({
        userId: user._id,
        expiredDate,
        token
      })

      session.save()

      const { refreshToken } = await this.createRefreshToken(session)
      await RefreshTokensManager.saveRefreshToken(refreshToken, session._id)

      return { session, refreshToken }
    } catch (err) {
      throw Error(err)
    }
  }

  static async restoreSession(sessionId) {
    try {
      await Session.findByIdAndRemove(sessionId)
    } catch (err) {
      throw Error(err)
    }

    // delete refresh token from redis
  }

  static async checkToken(token) {
    try {
      const decoded = await JWT.verify(token, config.secret)

      return decoded
    } catch (err) {
      throw Error(err)
    }
  }

  static async checkRefreshToken(token) {
    try {
      const decoded = await JWT.verify(token, config.secret)
      const savedToken = await RefreshTokensManager.getRefreshTokenBySessionId(
        decoded.session
      )

      if (savedToken !== token) return { error: 'Invalid token' }

      return decoded
    } catch (err) {
      throw Error(err)
    }
  }

  static async updateToken() {
    try {
      // const session = refreshToken
    } catch (err) {
      throw Error(err)
    }
  }
}

class RefreshTokensManager {
  static async saveRefreshToken(token, sessionId) {
    try {
      global.refreshTokens[sessionId] = token
    } catch (err) {
      throw Error(err)
    }
  }

  static async getRefreshTokenBySessionId(sessionId) {
    try {
      return global.refreshTokens[sessionId]
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = SessionManager
