/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')

const homeController = {}

/**
 * Renders the start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'Home'
homeController.index = (req, res) => {
  console.log(req.session)
  res.render('home/index', { viewData })
}

module.exports = homeController
