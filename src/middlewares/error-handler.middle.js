const logger = require('../config/winston').logger

module.exports = function errorHandler(err, req, res, next) {
  let logError
  let errors = err.errors || [{ msg: err }]

  // Filter relevant request fields
  if (errors) {
    logError = {
      url: req.url,
      method: req.method,
      params: req.params,
      query: req.query,
      headers: req.headers,
      body: req.body,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      // If we receive the real erro, we log it and return the "fake" error message to the request
      errors: err.realError
        ? [
            {
              msg: err.realError.message || err.realError,
              stack: err.realError.stack
            }
          ]
        : errors
    }
  }

  if (res.statusCode >= 400 && res.statusCode <= 499) {
    logger.warn(logError)
  } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    logger.error(logError)
  }

  return res.json({ errors: errors })
}
