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
 * Entry page for snippets route, returns all code snippets.
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
 * Returns a HTML form for creating a new code snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.new = async (req, res) => {
  res.render('snippets/new', { })
}

/**
 * Creates a new code snippet.
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

/**
 * Renders the snippets index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.edit = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      id: snippet._id,
      user: snippet.username,
      snippet: snippet.snippet,
      createdAt: moment(snippet.createdAt).format('YY-MM-DD HH:mm'),
      updatedAt: moment(snippet.updatedAt).format('YY-MM-DD HH:mm')
    }
    res.render('snippets/edit', { viewData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

module.exports = snippetsController
