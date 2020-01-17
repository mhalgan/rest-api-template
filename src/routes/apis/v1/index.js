const authClientRequest = require('../../../middlewares/authGuard')
const userRoutes = require('./users')
const authRoutes = require('./auth')

const express = require('express')
let router = express.Router()
router.use('/users', authClientRequest.authClientToken, userRoutes)
router.use('/auth', authRoutes)

module.exports = router
