const connectMongoDB = require('./createConnection')

const Session = require('./Session.model')
const User = require('./User.model')

module.exports = {
  createConnection: connectMongoDB,
  Session,
  User
}
