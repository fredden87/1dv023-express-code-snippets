/**
 * Login controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')

const loginController = {}

/**
 * Renders the login page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'Login'
loginController.index = (req, res) => {
  res.render('home/index', { viewData })
}

module.exports = loginController
