const server = require('./config/app')()
const config = require('./config/env/config')
const db = require('./config/db')

server.create(config, db)

server.start()
