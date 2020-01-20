const express = require('express')
const router = express.Router()
const apiRoute = require('./api')

// Page in the root of the URL to redirect lost users to documentation
router.get('/', function(req, res) {
  return res.send('Lost? Go to <a href="/api">API Documentation<a/>')
})
router.use('/api', apiRoute)

module.exports = router
