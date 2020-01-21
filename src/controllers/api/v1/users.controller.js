const User = require('../../../models/user.model')

const getUserById = async (req, res, next) => {
  let userId = req.params.id
  if (req.jwtId != userId) {
    res.status(401)
    return next({
      errors: [
        {
          msg: "you don't have permission to fetch this user"
        }
      ],
      realError: `JWT user id (${req.jwtId}) is diferent from the parameter id (${userId})`
    })
  }

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
    const { name, email } = req.body

    if (name === undefined || name === '') {
      return next(
        res.status(422).json({
          code: 'REQUIRED_FIELD_MISSING',
          description: 'name is required',
          field: 'name'
        })
      )
    }

    if (email === undefined || email === '') {
      return next(
        res.status(422).json({
          code: 'REQUIRED_FIELD_MISSING',
          description: 'email is required',
          field: 'email'
        })
      )
    }

    let userExists = await User.findById(userId)

    if (!userExists) {
      return next(
        res.status(404).json({
          code: 'BAD_REQUEST_ERROR',
          description: 'No user found in the system'
        })
      )
    }

    const temp = {
      name: name,
      email: email
    }

    let updateUser = await User.findByIdAndUpdate(userId, temp, {
      new: true
    })

    if (updateUser) {
      return next(
        res.status(200).json({
          message: 'user updated successfully',
          data: updateUser
        })
      )
    } else {
      throw new Error('something went worng')
    }
  } catch (error) {
    return next(
      res.status(500).json({
        code: 'SERVER_ERROR',
        description: 'something went wrong, Please try again'
      })
    )
  }
}

const deleteUser = async (req, res, next) => {
  let userId = req.params.id
  try {
    let user = await User.findByIdAndRemove(userId)
    if (user) {
      return res.status(204).json({
        msg: `user with id ${userId} deleted successfully`
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

module.exports = {
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser
}
