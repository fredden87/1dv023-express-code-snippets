/**
 * Register controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')

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
registerController.newUser = (req, res) => {
  console.log(req.body)
}

module.exports = registerController
