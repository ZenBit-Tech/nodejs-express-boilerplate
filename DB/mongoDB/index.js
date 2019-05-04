const connectMongoDB = require('./createConnection')

module.exports = {
  createDBConnection: connectMongoDB,
}
