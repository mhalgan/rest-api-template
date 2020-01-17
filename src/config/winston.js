const winston = require('winston')
const expressWinston = require('express-winston')
const ElasticSearch = require('winston-elasticsearch')

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
})

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true
})

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  statusLevel: false,
  level: function(req, res) {
    var level = ''
    if (res.statusCode >= 100) {
      level = 'info'
    }
    if (res.statusCode >= 400) {
      level = 'warn'
    }
    if (res.statusCode >= 500) {
      level = 'error'
    }
    return level
  }
})

module.exports = {
  logger: logger,
  requestLogger: requestLogger,
  errorLogger: errorLogger
}
