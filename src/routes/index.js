const express = require('express')
const router = express.Router()
const apiRoute = require('./apis')

router.get('/', function(req, res) {
  return res.send('Lost? Go to <a href="/api">API Documentation<a/>')
})
router.use('/api', apiRoute)

module.exports = router
