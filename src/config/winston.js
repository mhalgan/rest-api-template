const winston = require('winston')
const fs = require('fs')
// const ElasticSearch = require('winston-elasticsearch')
require('winston-daily-rotate-file')

let logDirectory = 'logs/'

if (!fs.existsSync(logDirectory)) {
  // Create the log directory if it does not exist
  fs.mkdirSync(logDirectory)
}

const dailyRotate = new winston.transports.DailyRotateFile({
  dirname: logDirectory,
  filename: 'rest-api-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  zippedArchive: true,
  level: 'warn'
})

const console = new winston.transports.Console()

const transports = [dailyRotate]
if (process.env.NODE_ENV != 'production') {
  transports.push(console)
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: transports,
  exitOnError: false
})

module.exports = {
  logger: logger
}
