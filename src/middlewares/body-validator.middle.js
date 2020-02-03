const { body } = require('express-validator')

const validateRegistrationBody = () => {
  return [
    body('name')
      .exists()
      .bail()
      .withMessage('name field is required')
      .isLength({ min: 3 })
      .withMessage('name must be greater than 3 letters'),
    body('email')
      .exists()
      .bail()
      .withMessage('email field is required')
      .isEmail()
      .withMessage('email is invalid'),
    body('password')
      .exists()
      .bail()
      .withMessage('password field is required')
      .isLength({ min: 8 })
      .withMessage('password must be greater then 8 letters')
  ]
}

const validateLoginBody = () => {
  return [
    body('email')
      .exists()
      .bail()
      .withMessage('email field is required')
      .isEmail()
      .withMessage('email is invalid'),
    body('password')
      .exists()
      .bail()
      .withMessage('password field is required')
      .isLength({ min: 8 })
      .withMessage('password must be greater then 8 letters')
  ]
}

module.exports = {
  validateRegistrationBody,
  validateLoginBody
}
