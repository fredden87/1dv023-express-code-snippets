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
  if (req.body.username && req.body.password1 === req.body.password2) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password1
      })
      await user.save()
      res.redirect('../login')
      console.log('User created!')
    } catch (error) {
      res.redirect('.')
      console.log(error)
    }
  } else {
    res.redirect('.')
    console.log('Validation error!')
  }
}

module.exports = registerController
