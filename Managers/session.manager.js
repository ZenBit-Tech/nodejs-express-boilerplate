const Session = require('../Models/Session.model')

const JWT = require('jsonwebtoken')
const moment = require('moment')
// const redis = require("redis")

const {
  TOKEN_SECRET,
  TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
} = process.env

const tokenConfig = {
  secret: TOKEN_SECRET,
  expires: TOKEN_EXPIRES,
}

const refreshTokenConfig = {
  secret: REFRESH_TOKEN_SECRET,
  expires: REFRESH_TOKEN_EXPIRES,
}

// const redisClient = redis.createClient
global.refreshTokens = {}

class SessionManager {
  async createToken(user) {
    try {
      let config = tokenConfig

      const token = JWT.sign({ user: user._id }, config.secret, {
        expiresIn: config.expires,
      })

      const expiredDate = moment()
        .add(config.expired)
        .valueOf()

      return { token, expiredDate }
    } catch (err) {
      throw Error(err)
    }
  }

  async createRefreshToken(session) {
    try {
      let config = refreshTokenConfig

      const refreshToken = JWT.sign({ session: session._id }, config.secret)

      return { refreshToken }
    } catch (err) {
      throw Error(err)
    }
  }

  async createSession(user) {
    try {
      const { token, expiredDate } = await this.createToken(user)

      const session = new Session({
        userId: user._id,
        expiredDate,
        token,
      })

      session.save()

      const { refreshToken } = await this.createRefreshToken(session)
      await RefreshTokensManager.saveRefreshToken(refreshToken, session._id)

      return { session, refreshToken }
    } catch (err) {
      throw Error(err)
    }
  }

  async restoreSession(sessionId) {
    try {
      await Session.findByIdAndRemove(sessionId)
    } catch (err) {
      throw Error(err)
    }

    // delete refresh token from redis
  }

  async checkToken(token) {
    try {
      const decoded = await JWT.verify(token, config.secret)

      return decoded
    } catch (err) {
      throw Error(err)
    }
  }

  async checkRefreshToken(token) {
    try {
      const decoded = await JWT.verify(token, config.secret)
      const savedToken = await RefreshTokensManager.getRefreshTokenBySessionId(
        decoded.session,
      )

      if (savedToken !== token) return { error: 'Invalid token' }

      return decoded
    } catch (err) {
      throw Error(err)
    }
  }

  async updateToken() {
    try {
      // const session = refreshToken
    } catch (err) {
      throw Error(err)
    }
  }
}

class RefreshTokensManager {
  async saveRefreshToken(token, sessionId) {
    try {
      global.refreshTokens[sessionId] = token
    } catch (err) {
      throw Error(err)
    }
  }

  async getRefreshTokenBySessionId(sessionId) {
    try {
      return global.refreshTokens[sessionId]
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = new SessionManager()
module.exports.SessionManager = SessionManager
