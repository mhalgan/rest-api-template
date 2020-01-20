const authClientRequest = require('../../../middlewares/authGuard')
const userRoutes = require('./users.route')
const todosRoutes = require('./todos.route')
const authRoutes = require('./auth.route')

const express = require('express')
let router = express.Router()

// Add routes
router.use('/auth', authRoutes)
router.use('/users', authClientRequest.authClientToken, userRoutes)
router.use('/todos', authClientRequest.authClientToken, todosRoutes)

module.exports = router
