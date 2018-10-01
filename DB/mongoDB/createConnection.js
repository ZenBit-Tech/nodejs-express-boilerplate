const mongoose = require('mongoose')

const dbConfig = require('../../Config/db')

const connectMongoDB = () => {
  mongoose.connect(
    dbConfig.mongodb.path,
    { useNewUrlParser: true }
  )
  const db = mongoose.connection

  db.on('error', err => logger.error('DB connection error: \n', err))
  db.once('open', function() {
    logger.event('Mongo DB connected on ' + dbConfig.mongodb.path)
  })
}

module.exports = connectMongoDB
