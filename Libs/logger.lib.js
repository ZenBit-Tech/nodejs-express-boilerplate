/* eslint-disable no-console */

// const _ = require('lodash')
// const moment = require('moment')
const loggerLib = require('tracer')
const colors = require('colors')

const path = require('path')
const appDir = path.dirname(require.main.filename)

const fileLogger = loggerLib.dailyfile({
  format: '[{{timestamp}}]: <{{title}}> {{message}}',
  dateformat: 'dd-mm-yy HH:MM',
  root: path.join(appDir, 'Logs')
  // maxLogFiles: 10
})

const consoleLogger = loggerLib.colorConsole({
  format: '[{{timestamp}}]: <{{title}}> {{message}}',
  dateformat: 'dd-mm-yy HH:MM',
  methods: ['event', 'trace', 'debug', 'info', 'warn', 'error'],
  filters: {
    //log : colors.black,
    event: colors.green,
    trace: colors.magenta,
    debug: colors.white,
    info: colors.blue,
    warn: colors.yellow,
    error: [colors.red, colors.bold]
  }
})

// const fs = require('fs')
// colors.setTheme({
//   info: ['blue'],
//   warn: ['yellow'],
//   error: ['red'],
//   debug: ['white'],
//   event: ['green']
// })

const logger = {}

logger.info = (...args) => {
  consoleLogger.info(...args)
  fileLogger.info(...args)
}

logger.warn = (...args) => {
  consoleLogger.warn(...args)
  fileLogger.warn(...args)
}

logger.error = (...args) => {
  consoleLogger.error(...args)
  fileLogger.error(...args)
}

logger.debug = (...args) => {
  consoleLogger.debug(...args)
  fileLogger.debug(...args)
}

logger.event = (...args) => {
  consoleLogger.event(...args)
  fileLogger.log(...args)
}

logger.logStart = () => {
  console.group()
}

logger.logEnd = () => {
  console.groupEnd()
}

global.logger = logger

// const getString = rows => {
//   let text = ``

//   for (let i = 0; i < rows.length; i++) {
//     try {
//       const row = rows[i]

//       if (_.isObject(row)) {
//         text += JSON.stringify(row) + ' '

//         if (row.stack) {
//           text += `${row.stack} `
//         }
//       } else {
//         text += row.toString() + ` `
//       }
//     } catch (err) {
//       console.log('[ERROR]: logger \n', err)
//     }
//   }

//   return text
// }

// const appendLogFile = (logType, text) => {
//   const filename = `${moment().format('DD-MM-YY')}.log`
//   const filePath = path.join(appDir, 'Logs', logType, filename)

//   const time = moment().format('HH:mm:ss')
//   const log = `~${time}:\n${text}\n`

//   fs.appendFile(filePath, log, err => {
//     if (err) console.error('can`t put log \n', err)
//   })
// }
