const routes = {
  signUp: {
    handler: 'Handlers/auth/register',
    middlewares: [],
    events: {
      http: {
        path: '/api/v1/auth/signup',
        method: 'post'
      }
    }
  }
  // sheduleLog: {
  //   handler: 'Handlers/shedule/log',
  //   events: {
  //     shedule: {
  //       rate: '* * * * * *',
  //       enabled: false
  //     }
  //   }
  // }
}

module.exports = routes
