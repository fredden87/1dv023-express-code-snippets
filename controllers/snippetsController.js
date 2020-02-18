/**
 * Snippets controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const moment = require('moment')
const Snippet = require('../models/snippet')
const snippetsController = {}

/**
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.index = async (req, res) => {
  try {
    const viewData = {
      snippets: (await Snippet.find({}))
        .map(snippet => ({
          id: snippet._id,
          user: snippet.username,
          snippet: snippet.snippet,
          createdAt: moment(snippet.createdAt).format('YY-MM-DD HH:mm'),
          updatedAt: moment(snippet.updatedAt).format('YY-MM-DD HH:mm')
        }))
    }
    res.render('snippets/index', { viewData })
  } catch (error) {
    console.log(error)
  }
}

/**
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.new = async (req, res) => {
  res.render('snippets/new', { })
}

/**
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.create = async (req, res) => {
  if (req.body.message) {
    try {
      const snippet = new Snippet({
        username: 'test',
        snippet: req.body.message
      })
      await snippet.save()
      req.session.flash = { type: 'success', text: 'Snippet successfully saved.' }
      res.redirect('.')
    } catch (error) {
      console.log(error)
      req.session.flash = { type: 'danger', text: 'Something went wrong, please try again.' }
      res.redirect('.')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Something went wrong, please try again.' }
    res.redirect('.')
  }
}

module.exports = snippetsController
