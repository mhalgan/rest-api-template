const server = require('./configs/app')()
const config = require('./configs/config/config')
const db = require('./configs/db')

server.create(config, db)

server.start()
