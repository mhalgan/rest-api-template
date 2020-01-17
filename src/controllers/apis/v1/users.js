const express = require('express')
let router = express.Router()

const userService = require('../../../services/v1/users/users')
const authClientRequest = require('../../../middlewares/authGuard')

router.get('/', authClientRequest.authClientToken, userService.getUsers)
router.get('/:id', authClientRequest.authClientToken, userService.getUserById)
router.post('/', authClientRequest.authClientToken, userService.createUser)
router.put('/:id', authClientRequest.authClientToken, userService.updateUser)
router.delete('/:id', authClientRequest.authClientToken, userService.deleteUser)

module.exports = router
