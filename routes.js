const PassportLib = require('./Libs/passport')

const routes = {
  rootPost: {
    handler: 'Handlers/hello',
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/',
        method: 'post'
      }
    }
  },
  login: {
    handler: 'Handlers/auth/login',
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/login',
        method: 'POST'
      }
    }
  },
  googleAuth: {
    handler: PassportLib.authGoogleMiddleware,
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/google',
        method: 'GET'
      }
    }
  },
  googleAuthCallback: {
    handler: 'Handlers/auth/googleCallback',
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/google/callback',
        method: 'GET'
      }
    }
  },
  linkedinAuth: {
    handler: PassportLib.linkedinAuthMiddleware,
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/linkedin',
        method: 'GET'
      }
    }
  },
  linkedinAuthCallback: {
    handler: 'Handlers/auth/linkedinCallback',
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/linkedin/callback',
        method: 'GET'
      }
    }
  },
  sheduleLog: {
    handler: 'Handlers/shedule/log',
    events: {
      shedule: {
        rate: '* * * * * *',
        enabled: false
      }
    }
  }
}

module.exports = routes
