const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const userModel = require('../../../models/user.model')

const register = async (req, res, next) => {
  const errors = validationResult(req)

  // Check if the body of the request is valid
  if (!errors.isEmpty()) {
    res.status(422)
    return next(errors)
  }

  let { name, email, password } = req.body

  // Check if e-mail already exists
  let emailExists
  try {
    emailExists = await userModel.findOne({ email: email })
  } catch (error) {
    res.status(500)
    return next({
      errors: [{ msg: 'there was a problem registering the user' }],
      realError: error
    })
  }
  if (emailExists) {
    res.status(409)
    return next('email already exists')
  }

  // Encrypt the password and create the user in the database
  let hashedPassword = await bcrypt.hash(password, 8)
  try {
    let user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    })

    if (!user) {
      throw new error('user not generated')
    }

    return res.status(201).json({
      success: [{ msg: 'user registered successfully' }]
    })
  } catch (error) {
    res.status(500)
    return next({
      errors: [{ msg: 'there was a problem registering the user' }],
      realError: error
    })
  }
}

const login = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(res.status(422).json({ errors: errors.array() }))
  }

  let { email, password } = req.body
  try {
    let userExists = await userModel.findOne({ email: email })
    let passwordValid = await bcrypt.compare(password, userExists.password)

    if (!userExists || !passwordValid) {
      res.status(401)
      return next('email/password is wrong')
    }

    let token = jwt.sign({ id: userExists._id }, process.env.PRIVATE_KEY, {
      expiresIn: 86400
    })

    return next(
      res.status(200).json({
        success: [
          { msg: 'user logged in successfully', email: email, token: token }
        ]
      })
    )
  } catch (error) {
    return next(
      res.status(500).json({
        errors: [{ msg: 'there was a problem login a user' }],
        realError: error.message
      })
    )
  }
}

module.exports = {
  register: register,
  login: login
}
