const authClientRequest = require('../../../middlewares/authGuard')
const userRoutes = require('./users.route')
const authRoutes = require('./auth.route')

const express = require('express')
let router = express.Router()
router.use('/users', authClientRequest.authClientToken, userRoutes)
router.use('/auth', authRoutes)

module.exports = router
