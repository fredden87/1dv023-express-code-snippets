/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const moment = require('moment')

const homeController = {}

/**
 * Renders the start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const viewData = 'hej'
homeController.index = (req, res) => {
  res.render('home/index', { viewData })
}

/**
 * Renders a view with posted data.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.indexPost = (req, res) => {
  const viewData = {
    name: req.body.name,
    dayName: moment().format('dddd')
  }

  res.render('home/index', { viewData })
}

module.exports = homeController
