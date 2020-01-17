const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config/env/config')

const authClientToken = async (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token provided' }] })
  }

  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Invalid token', error: err }] })
    }

    return next()
  })
}

module.exports = {
  authClientToken: authClientToken
}
