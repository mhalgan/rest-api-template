const collection = 'test'
const user = 'user'
const password = 'pass123'

module.exports = {
  mongoAtlas: `mongodb+srv://${user}:${password}@cluster0-cygcu.mongodb.net/${collection}?retryWrites=true&w=majority`,
  mongoLocal: `mongodb://localhost:27017/${collection}`
}
