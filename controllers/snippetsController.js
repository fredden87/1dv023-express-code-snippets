/**
 * Snippets controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')

const snippetsController = {}

/**
 * Renders the start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'Snippets'
snippetsController.index = (req, res) => {
  res.render('home/index', { viewData })
}

module.exports = snippetsController
