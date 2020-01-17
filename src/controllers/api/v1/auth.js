const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const config = require('../../../config/env/config')
const userModel = require('../../../models/user')

const register = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(res.status(422).json({ errors: errors.array() }))
  }
  let { name, email, password } = req.body
  let emailExists = await userModel.findOne({ email: email })

  if (emailExists) {
    return next(
      res.status(409).json({ errors: [{ msg: 'email already exists' }] })
    )
  }

  let hashedPassword = await bcrypt.hash(password, 8)
  try {
    let user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    })
    if (!user) {
      throw new error()
    }

    return next(
      res.status(201).json({
        success: [{ msg: 'user registered successfully' }]
      })
    )
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ errors: [{ msg: 'there was a problem registering a user' }] }),
      error
    )
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
      return next(
        res.status(401).json({
          errors: [{ msg: 'email/password is wrong' }]
        })
      )
    }

    let token = jwt.sign({ id: userExists._id }, process.env.PRIVATE_KEY, {
      expiresIn: 86400
    })

    return next(
      res.status(200).json({
        success: [
          { msg: 'user login successfully', email: email, token: token }
        ]
      })
    )
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ errors: [{ msg: 'there was a problem login a user' }] }),
      error
    )
  }
}

module.exports = {
  register: register,
  login: login
}
