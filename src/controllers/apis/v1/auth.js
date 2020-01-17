const express = require('express')
let router = express.Router()

const authService = require('../../../services/v1/auth/auth')
const validation = require('../../../middlewares/validation')

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         example: user@email.com
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *   CompleteUser:
 *     allOf:
 *      -  $ref: "#/definitions/User"
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: uuid
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 *   Order:
 *     type: object
 *     required:
 *       - product
 *       - userId
 *     properties:
 *       product:
 *         type: string
 *       userId:
 *         type: string
 *         format: uuid
 *       tags:
 *         type: array
 *         items:
 *          type: string
 *       price:
 *         format: float
 *         type: number
 *       quantity:
 *         type: number
 *         format: float
 *   CompleteOrder:
 *     allOf:
 *      -  $ref: "#/definitions/Order"
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: uuid
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary:
 *      - Returns a list with all users
 *     produces:
 *      - application/json
 *     tags:
 *      - users
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/CompleteUser'
 */
router.post(
  '/register',
  validation.validateRegistrationBody(),
  authService.register
)
router.post('/login', validation.validateLoginBody(), authService.login)

module.exports = router
