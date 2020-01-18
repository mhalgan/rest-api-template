const express = require('express')
let router = express.Router()

const usersController = require('../../../controllers/api/v1/users.controller')

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.createUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router
