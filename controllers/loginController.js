/**
 * Login controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')
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

loginController.auth = async (req, res) => {
  if (req.body.username.length > 0 && req.body.password.length > 2) {
  }
}

module.exports = loginController
