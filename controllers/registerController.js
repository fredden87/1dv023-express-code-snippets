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

registerController.index = (req, res) => {
  res.render('register/index')
}

/**
 * Handels post made to / and registers a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
registerController.create = async (req, res) => {
  if (req.body.username.length > 0 && req.body.password1 === req.body.password2) {
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
  } else if (req.body.username.length > 0 && req.body.password1 !== req.body.password2) {
    req.session.flash = { type: 'danger', text: "Password don't match. Please try again!" }
    res.redirect('.')
  } else {
    req.session.flash = { type: 'danger', text: 'Something went wrong. Please try again!' }
    res.redirect('.')
  }
}

module.exports = registerController
