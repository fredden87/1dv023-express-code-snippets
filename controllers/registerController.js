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
  res.render('home/index', { viewData })
}

module.exports = registerController
