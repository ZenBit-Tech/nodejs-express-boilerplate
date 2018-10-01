const routes = {
  root: {
    handler: 'Handlers/hello',
    middleware: [],
    events: {
      http: {
        path: '/',
        method: 'get'
      }
    }
  },
  rootPost: {
    handler: 'Handlers/hello',
    middlewares: [],
    events: {
      http: {
        path: '/',
        method: 'post'
      }
    }
  },
  login: {
    handler: 'Handlers/hello',
    middlewares: [],
    events: {
      http: {
        path: '/auth/login',
        method: 'post'
      }
    }
  },
  getUsers: {
    handler: 'Handlers/hello',
    middlewares: [],
    events: {
      http: {
        path: '/users',
        method: 'get'
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
