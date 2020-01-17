const express = require('express')
const router = express.Router()
const apiRoute = require('./apis')

router.use('/api', apiRoute)

module.exports = router
