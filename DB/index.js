const { DEFAULT_DB } = process.env

const mongodb = require('./mongoDB')
const mysql = require('./mySQL')

module.exports = {
  default: DEFAULT_DB === 'mongodb' ? mongodb : mysql,
  mongodb,
  mysql
}

