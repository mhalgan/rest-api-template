const express = require('express')
let router = express.Router()

const usersController = require('../../../controllers/api/v1/users.controller')

/**
 * @swagger
 *
 * definitions:
 *   UpdateUser:
 *     type: object
 *     required:
 *       email
 *       name
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       name:
 *         type: string
 *         minLength: 3
 *
 *   User:
 *     allOf:
 *     -  $ref: "#/definitions/UpdateUser"
 *     type: object
 *     required:
 *       createdAt
 *       updatedAt
 *     properties:
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

/**
 *  @swagger
 *  /users/{id}:
 *    get:
 *      summary:
 *      - Get user data by id
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "User id"
 *        required: true
 *        type: "string"
 *      tags:
 *      - users
 *      responses:
 *        200:
 *          description: "User fetched successfully"
 *          schema:
 *            $ref: "#/definitions/User"
 *        401:
 *          description: "User id param is different from the user id inside JWT payload"
 *        404:
 *          description: "User not found"
 */
router.get('/:id', usersController.checkUser, usersController.getUserById)

router.put('/:id', usersController.checkUser, usersController.updateUser)

/**
 *  @swagger
 *  /users/{id}:
 *    delete:
 *      summary:
 *      - Delete the user with the given id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "User id"
 *        required: true
 *        type: "string"
 *      tags:
 *      - users
 *      responses:
 *        204:
 *          description: "User deleted successfully"
 *        401:
 *          description: "User id param is different from the user id inside JWT payload"
 *        404:
 *          description: "User not found"
 */
router.delete('/:id', usersController.checkUser, usersController.deleteUser)

module.exports = router
