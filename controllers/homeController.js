/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const homeController = {}

/**
 * Renders the start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

homeController.index = (req, res) => {
  const viewData = 'Hello'
  res.render('home/index', { viewData })
}

module.exports = homeController
