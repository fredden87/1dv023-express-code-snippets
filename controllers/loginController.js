/**
 * Login controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const User = require('../models/User')
const loginController = {}

/**
 * Renders the login page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

loginController.index = (req, res) => {
  res.render('login/index')
}

/**
 * Authenticates a user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

loginController.auth = async (req, res) => {
  console.log(req.body.username)
  try {
    const user = await User.authenticate(req.body.username, req.body.password)
    req.session.regenerate(() => {
      req.session.userName = user.username
      req.session.flash = { type: 'success', text: 'Successfully logged in.' }
      res.redirect('..')
    })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
  }
}

module.exports = loginController
