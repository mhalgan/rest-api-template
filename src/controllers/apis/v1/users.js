const express = require('express')
let router = express.Router()

const userService = require('../../../services/v1/users/users')

router.get('/', userService.getUsers)
router.get('/:id', userService.getUserById)
router.post('/', userService.createUser)
router.put('/:id', userService.updateUser)
router.delete('/:id', userService.deleteUser)

module.exports = router
