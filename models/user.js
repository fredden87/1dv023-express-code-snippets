/**
 * Mongoose model User.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Schema representing a user account.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  }
}, {
  timestamps: true
})

userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(password === user.password)) {
    throw new Error('Invalid login attempt.')
  }
  return user
}

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
