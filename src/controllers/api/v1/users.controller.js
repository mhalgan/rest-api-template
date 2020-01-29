const bcrypt = require('bcryptjs')
const User = require('../../../models/user.model')

const getUserById = async (req, res, next) => {
  let userId = req.params.id

  try {
    // Get user from database
    let user = await User.findById(userId).select(
      'name email createdAt updatedAt'
    )
    if (user) {
      return res.status(200).json({
        msg: `user with id ${userId} fetched successfully`,
        user: user
      })
    }

    // User not found
    res.status(404)
    return next(`user with id ${userId} not found`)
  } catch (error) {
    res.status(500)
    return next({
      errors: [
        {
          msg: `there was a problem fetching the user with id ${userId}`
        }
      ],
      realError: error
    })
  }
}

const updateUser = async (req, res, next) => {
  let userId = req.params.id
  try {
    const temp = ({ name, email, password } = req.body)

    // Password verifications
    if (temp.password) {
      if (temp.password.length < 8) {
        res.status(422)
        return next(`password must be greater then 8 letters`)
      }
      temp.password = await bcrypt.hash(password, 8)
    }

    let userExists = await User.findById(userId)
    if (!userExists) {
      res.status(404)
      return next(`user with id ${userId} not found`)
    }

    let updateUser = await User.findByIdAndUpdate(userId, temp, {
      useFindAndModify: false,
      new: true,
      runValidators: true,
      select: 'name email createdAt updatedAt'
    })

    if (updateUser) {
      return res.status(200).json({
        msg: 'user updated successfully',
        user: updateUser
      })
    } else {
      throw new Error()
    }
  } catch (error) {
    if (error.name == 'ValidationError') {
      res.status(422)
      return next(error)
    }

    if (error.name == 'MongoError' && error.codeName == 'DuplicateKey') {
      res.status(409)
      return next(error)
    }

    res.status(500)
    return next({
      errors: [
        {
          msg: `there was a problem updating the user with id ${userId}`
        }
      ],
      realError: error
    })
  }
}

const deleteUser = async (req, res, next) => {
  let userId = req.params.id

  try {
    let user = await User.findByIdAndRemove(userId, { useFindAndModify: false })
    if (user) {
      return res.status(204).json()
    }

    // User not found
    res.status(404)
    return next(`user with id ${userId} not found`)
  } catch (error) {
    res.status(500)
    return next({
      errors: [
        {
          msg: `there was a problem fetching the user with id ${userId}`
        }
      ],
      realError: error
    })
  }
}

const checkUser = async (req, res, next) => {
  // Checks if the user inside the payload is the same user being requested
  let userId = req.params.id
  if (req.jwtId != userId) {
    res.status(401)
    return next({
      errors: [
        {
          msg: 'you have no permission to interact with this user'
        }
      ],
      realError: `JWT user id (${req.jwtId}) is diferent from the parameter id (${userId})`
    })
  }
  next()
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
  checkUser
}
