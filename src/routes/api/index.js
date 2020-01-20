const express = require('express')
let router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../../swagger.json')
const v1ApiController = require('./v1')

// Load Swagger documentation
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

router.use('/v1', v1ApiController)
module.exports = router
