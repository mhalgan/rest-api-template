const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config/env/config')

const authClientToken = async (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    res.status(401)
    return next('no token provided')
  }

  // Check if token is valid
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res.status(401)
      return next({ errors: [{ msg: 'invalid token' }], realError: err })
    }

    req.jwtId = decoded.id
    next()
  })
}

module.exports = {
  authClientToken
}
