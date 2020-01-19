const mongoose = require('mongoose')
let Schema = mongoose.Schema

let ToDo = new Schema(
  {
    decription: {
      type: String,
      required: [true, 'description is required']
    },
    done: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
