const logger = require('../config/winston').logger

module.exports = function errorHandler(err, req, res, next) {
  if (res.status >= 400 && res.status <= 499) {
    logger.warn(err)
  } else if (res.status >= 500 && res.status <= 599) {
    logger.error(err)
  }
  return res
}
