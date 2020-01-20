const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config/env/config')

const authClientToken = async (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return next(
      res.status(401).json({ errors: [{ msg: 'No token provided' }] })
    )
  }

  // Check if token is valid
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return next(
        res.status(401).json({ errors: [{ msg: 'Invalid token', error: err }] })
      )
    }
    next()
  })
}

module.exports = {
  authClientToken: authClientToken
}
