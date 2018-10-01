const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB_NAME
} = process.env

const mongoPath = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`

const config = {
  mysql: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  },
  mongodb: {
    path: mongoPath,
    port: MONGO_PORT,
    host: MONGO_HOST,
    database: MONGO_DB_NAME
  }
}

module.exports = config
