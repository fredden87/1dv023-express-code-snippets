/**
 * Mongoose model User.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Schema representing a user account.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
})
/**
 * Authenticate username and password against database.
 *
 * @param {string} username - Username string.
 * @param {string} password - Password string.
 *
 * Returns authenticated Userobject.
 *
 * @returns {object} From database.
 */

userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }
  return user
}

// Generate salt and hash before save.
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
