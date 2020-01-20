const _ = require('lodash')
const env = process.env.NODE_ENV || 'local'

// Set the environment variables
const envConfig = require('./' + env)
let defaultConfig = {
  env: env
}
module.exports = _.merge(defaultConfig, envConfig)
