/**
 * Register controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const User = require('../models/User')
const registerController = {}

/**
 * Returns a HTML form for creating a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

registerController.index = (req, res) => {
  res.render('register/index')
}

/**
 * Registers a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} next - Express forward object.
 */
registerController.create = async (req, res, next) => {
  if (req.body.username.length > 0 && req.body.password1 === req.body.password2) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password1
      })
      await user.save()
      req.session.flash = { type: 'success', text: 'Account created successfully, please login.' }
      res.redirect('../login')
    } catch (error) {
      error.statusCode = 500
      return next(error)
    }
  } else if (req.body.password1 !== req.body.password2) {
    req.session.flash = { type: 'danger', text: "Passwords don't match." }
    res.redirect('.')
  } else {
    req.session.flash = { type: 'danger', text: 'Something went wrong, please try again.' }
    res.redirect('.')
  }
}

module.exports = registerController
