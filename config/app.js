const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')

module.exports = function() {
  let server = express(),
    create,
    start

  create = (config, db) => {
    let routes = require('../routes')

    server.set('env', config.env)
    server.set('port', config.port)
    server.set('hostname', config.hostname)

    // Middlewares
    server.use(bodyParser.json())
    server.use(cors())
    server.use(helmet())
    server.use(
      bodyParser.urlencoded({
        extended: false
      })
    )

    mongoose
      .connect(db.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .catch(function(error) {
        console.log(error)
        process.exit(1)
      })

    routes.init(server)
  }

  start = () => {
    let hostname = server.get('hostname'),
      port = server.get('port')

    server.listen(port, function() {
      console.log(`Express server listening on http://${hostname}:${port}/`)
    })
  }

  return { create: create, start: start }
}
