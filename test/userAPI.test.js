const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/server')
const should = chai.should()

chai.use(chaiHttp)

process.env.NODE_ENV = 'test'

describe('Test user API', function() {
  let id
  let user
  let newUser = {
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test'
  }

  let badNewUser = {
    firstName: 'test',
    lastName: 'test'
  }

  let updateUser = {
    firstName: 'test2'
  }

  let badUpdateUser = {
    email: null
  }

  it('Create new user', function(done) {
    chai
      .request(server)
      .post('/api/users')
      .send(newUser)
      .end(function(err, res) {
        id = res.body._id
        res.should.have.status(201)
        done()
      })
  })

  it('Block new user with repeated email', function(done) {
    chai
      .request(server)
      .post('/api/users')
      .send(newUser)
      .end(function(err, res) {
        res.should.have.status(409)
        done()
      })
  })

  it('Block new user without required fields', function(done) {
    chai
      .request(server)
      .post('/api/users')
      .send(badNewUser)
      .end(function(err, res) {
        res.should.have.status(405)
        done()
      })
  })

  it('Get new user', function(done) {
    chai
      .request(server)
      .get('/api/users/' + id)
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id').equals(id)
        user = res.body
        done()
      })
  })

  it('Get new user orders', function(done) {
    chai
      .request(server)
      .get('/api/users/' + id + '/orders')
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
  })

  it('Get all users', function(done) {
    chai
      .request(server)
      .get('/api/users')
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.deep.include(user)
        done()
      })
  })

  it('Update user', function(done) {
    chai
      .request(server)
      .put('/api/users/' + id)
      .send(updateUser)
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id').equals(id)
        res.body.should.have.property('firstName').equals(updateUser.firstName)
        done()
      })
  })

  it('Block email deletion', function(done) {
    chai
      .request(server)
      .put('/api/users/' + id)
      .send(badUpdateUser)
      .end(function(err, res) {
        res.should.have.status(405)
        done()
      })
  })

  it('Delete created user', function(done) {
    chai
      .request(server)
      .delete('/api/users/' + id)
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
})
