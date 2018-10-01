/* eslint-disable no-console */
const colors = require('colors')

const _ = require('lodash')
const moment = require('moment')

const fs = require('fs')
const path = require('path')
const appDir = path.dirname(require.main.filename)

const logger = {}

colors.setTheme({
  info: ['blue'],
  warn: ['yellow'],
  error: ['red'],
  debug: ['white'],
  event: ['green']
})

const getString = rows => {
  let text = ``

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i]

      if (_.isObject(row)) {
        text += JSON.stringify(row) + ' '

        if (row.stack) {
          text += `${row.stack} `
        }
      } else {
        text += row.toString() + ` `
      }
    } catch (err) {
      console.log('[ERROR]: logger \n', err)
    }
  }

  return text
}

const appendLogFile = (logType, text) => {
  const filename = `${moment().format('DD-MM-YY')}.log`
  const filePath = path.join(appDir, 'Logs', logType, filename)

  const time = moment().format('HH:mm:ss')
  const log = `~${time}:\n${text}\n`

  fs.appendFile(filePath, log, err => {
    if (err) console.error('can`t put log \n', err)
  })
}

logger.info = (...args) => {
  const text = getString(args)

  console.log(colors.info(text))

  appendLogFile('out', text)
}

logger.warn = (...args) => {
  const text = getString(args)
  const msg = `[WARN]: ${text}`

  console.warn(colors.warn(msg))

  appendLogFile('out', msg)
}

logger.error = (...args) => {
  const text = getString(args)
  const msg = `[ERROR]: ${text}`

  console.error(colors.error(msg))

  appendLogFile('error', msg)
  appendLogFile('out', msg)
}

logger.debug = (...args) => {
  const text = getString(args)
  const msg = `[DEBUG]: ${text}`

  console.log(colors.debug(msg))

  appendLogFile('out', msg)
}

logger.event = (...args) => {
  const text = getString(args)

  console.log(colors.event(text))

  appendLogFile('out', text)
}

logger.logStart = () => {
  console.group()
}

logger.logEnd = () => {
  console.groupEnd()
}

global.logger = logger
