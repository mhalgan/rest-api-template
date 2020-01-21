const User = require('../../../models/user.model')

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find({})

    if (users.length > 0) {
      return next(
        res.status(200).json({
          message: 'users fetched successfully',
          data: users
        })
      )
    }

    return next(
      res.status(404).json({
        code: 'BAD_REQUEST_ERROR',
        description: 'No users found in the system'
      })
    )
  } catch (error) {
    return next(
      res.status(500).json({
        code: 'SERVER_ERROR',
        description: 'something went wrong, Please try again'
      })
    )
  }
}

const getUserById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    if (user) {
      return next(
        res.status(200).json({
          message: `user with id ${req.params.id} fetched successfully`,
          data: user
        })
      )
    }

    return next(
      res.status(404).json({
        code: 'BAD_REQUEST_ERROR',
        description: 'No users found in the system'
      })
    )
  } catch (error) {
    return next(
      res.status(500).json({
        code: 'SERVER_ERROR',
        description: 'something went wrong, Please try again'
      })
    )
  }
}

const createUser = async (req, res, next) => {
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

    let isEmailExists = await User.findOne({
      email: email
    })

    if (isEmailExists) {
      return next(
        res.status(409).json({
          code: 'ENTITY_ALREAY_EXISTS',
          description: 'email already exists',
          field: 'email'
        })
      )
    }

    const temp = {
      name: name,
      email: email
    }

    let newUser = await User.create(temp)

    if (newUser) {
      return next(
        res.status(201).json({
          message: 'user created successfully',
          data: newUser
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

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id

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

    let isUserExists = await User.findById(userId)

    if (!isUserExists) {
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
  try {
    let user = await User.findByIdAndRemove(req.params.id)
    if (user) {
      return next(
        res.status(204).json({
          message: `user with id ${req.params.id} deleted successfully`
        })
      )
    }

    return next(
      res.status(404).json({
        code: 'BAD_REQUEST_ERROR',
        description: 'No users found in the system'
      })
    )
  } catch (error) {
    return next(
      res.status(500).json({
        code: 'SERVER_ERROR',
        description: 'something went wrong, Please try again'
      })
    )
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
