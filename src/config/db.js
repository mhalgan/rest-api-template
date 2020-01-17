const collection = 'test'
module.exports = {
  secret: 'restapisecret',
  database:
    //`mongodb+srv://admin:0E3jnLjBLkyGNZO3@cluster0-cygcu.mongodb.net/${collection}?retryWrites=true&w=majority` // MongoDB Atlas
    `mongodb://localhost:27017/${collection}` // Local
}
