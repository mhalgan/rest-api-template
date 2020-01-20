const logger = require('../config/winston').logger

module.exports = function errorHandler(err, req, res, next) {
  // Filter relevant error fields
  if (err) {
    err = {
      url: err.req.url,
      method: err.req.method,
      params: err.req.params,
      query: err.req.query,
      headers: err.req.headers,
      body: err.req.body,
      statusCode: err.statusCode,
      statusMessage: err.statusMessage
    }
  }

  if (res.statusCode >= 400 && res.statusCode <= 499) {
    logger.warn(err)
  } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    logger.error(err)
  }
  return res
}
