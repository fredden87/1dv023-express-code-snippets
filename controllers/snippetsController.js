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
    viewData.snippets.reverse()
    res.render('snippets/index', { viewData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
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
  if (req.body.snippet.trim().length) {
    try {
      const snippet = new Snippet({
        username: req.session.userName,
        snippet: req.body.snippet
      })
      await snippet.save()
      req.session.flash = { type: 'success', text: 'Success: Code snippet successfully saved.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('.')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Error: Code snippet must be at least 1 character long.' }
    res.redirect('.')
  }
}

/**
 * Returns a HTML form for editing a code snippet.
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

/**
 * Updates a specific code snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.update = async (req, res) => {
  if (req.body.snippet.trim().length) {
    try {
      const result = await Snippet.updateOne({ _id: req.params.id }, {
        snippet: req.body.snippet
      })
      if (result.nModified === 1) {
        req.session.flash = { type: 'success', text: 'Success: The code snippet was updated successfully.' }
      } else {
        req.session.flash = { type: 'danger', text: 'Error: Unable to update code snippet.' }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./edit')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Error: Code snippet must be at least 1 character long.' }
    res.redirect('./edit')
  }
}

/**
 * Returns a HTML form for removing a code snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
snippetsController.remove = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      id: snippet._id,
      snippet: snippet.snippet
    }
    res.render('snippets/remove', { viewData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

/**
 * Deletes a specific code snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetsController.delete = async (req, res) => {
  try {
    await Snippet.deleteOne({ _id: req.params.id })
    req.session.flash = { type: 'success', text: 'Success: The code snippet was successfully removed.' }
    res.redirect('..')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./remove')
  }
}

/**
 * Handles the authorization for protected resources.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} next - Express forward object.
 * @returns Authorization error 403.
 */

snippetsController.authorize = async (req, res, next) => {
  if (!req.params.id && req.session.userName) {
    return next()
  }
  const userName = async function () {
    const user = await Snippet.findOne({ _id: req.params.id })
    return user.username
  }
  if (!req.session.userName || (req.session.userName !== await userName())) {
    const error = new Error('Status code 403: Forbidden')
    error.statusCode = 403
    return next(error)
  }
  next()
}

module.exports = snippetsController
