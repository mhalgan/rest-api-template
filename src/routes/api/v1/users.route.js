const express = require('express')
let router = express.Router()

const usersController = require('../../../controllers/api/v1/users.controller')

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       email
 *       name
 *       createdAt
 *       updatedAt
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       name:
 *         type: string
 *         minLength: 3
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

/**
 *  @swagger
 *  /users/{id}:
 *    put:
 *      summary:
 *      - Updates user identified by id with the payload values
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "User id"
 *        required: true
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "User to be registered"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/RegisterUpdateUser"
 *      tags:
 *      - users
 *      responses:
 *        200:
 *          description: "User fetched successfully"
 *          schema:
 *            $ref: "#/definitions/User"
 *        401:
 *          description: User id param is different from the user id inside JWT payload
 *        404:
 *          description: User not found
 *        409:
 *          description: E-mail already exists
 *        422:
 *          description: Some required field is missing
 */
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
