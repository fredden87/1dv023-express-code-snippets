/**
 * Register controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')
const User = require('../models/User')
const registerController = {}

/**
 * Renders the register page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'Register'
registerController.index = (req, res) => {
  res.render('register/new', { viewData })
}

/**
 * Handels post made to /newuser to register a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
registerController.newUser = async (req, res) => {
  if (req.body.username > 0 && req.body.password1 === req.body.password2) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password1
      })
      await user.save()
      req.session.flash = { type: 'success', text: 'New account created successfully. Please login!' }
      res.redirect('../login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong. Please try again!' }
      res.redirect('.')
    }
  }
  if (req.body.username > 0 && req.body.password1 !== req.body.password2) {
    req.session.flash = { type: 'danger', text: "Passwords don't match. Please try again!" }
    res.redirect('.')
  } else {
    req.session.flash = { type: 'danger', text: 'Something went wrong. Please try again!' }
    res.redirect('.')
  }
}

module.exports = registerController
