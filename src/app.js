const server = require('./config/server')()
const config = require('./config/env/config')
const db = require('./config/db')

server.create(config, db)

server.start()
