const mysql = require('mysql')
const config = require('../Config/db')

let connection = mysql.createConnection(config)
 const createDBConnection = () => {
  connection = mysql.createConnection(config)

  connection.connect(err => {
    if (err) return logger.error('connect to DB error: ', err)

    logger.info('connected to DB ', connection.config.host, '\n')
  })

  connection.on('error', function(err) {
    logger.error(`[ERROR]: DB \n ,`, err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      createDBConnection()
    } else {
      throw err
    }
  })
}

export default connection
