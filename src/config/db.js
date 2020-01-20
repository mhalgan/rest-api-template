const mongoose = require('mongoose')

const collection = 'test'
const user = 'admin'
const password = '2GFCikqDsTe9eoHA'

const connection = {
  mongoAtlas: `mongodb+srv://${user}:${password}@cluster0-cygcu.mongodb.net/${collection}?w=majority`,
  mongoLocal: `mongodb://localhost:2017/${collection}`
}

exports.connect = function() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connection.mongoLocal, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(function() {
        console.log('MongoDB connected!')
        resolve()
      })
      .catch(function(error) {
        console.log(error)
        reject(error)
      })
  })
}
