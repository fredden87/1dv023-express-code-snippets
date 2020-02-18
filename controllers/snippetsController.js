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
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'Snippets'
snippetsController.index = (req, res) => {
  const viewData = 'Snippets'
  res.render('snippets/index', { viewData })
}

/**
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.new = (req, res) => {
  const viewData = 'Snippets'
  res.render('snippets/new', { viewData })
}

module.exports = snippetsController
