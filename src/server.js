require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./config/winston')
const config = require('./config/env/config')
const db = require('./config/db')
const routes = require('./routes')

let app = express()

app.set('env', config.env)
app.set('port', config.port)
app.set('hostname', config.hostname)

// Middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
db.connect()
  .then(function() {
    // Logs before routes
    app.use(logger.requestLogger)
    app.use(routes)
    // Logs errors
    app.use(logger.errorLogger)

    let hostname = app.get('hostname'),
      port = app.get('port')

    app.listen(port, function() {
      console.log(`Express app listening on http://${hostname}:${port}/api`)
    })
  })
  .catch(function(error) {
    console.log(error)
  })

module.exports = app
