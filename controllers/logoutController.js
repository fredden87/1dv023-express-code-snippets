/**
 * Login controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const logoutController = {}

/**
 * Loging out the user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

logoutController.index = (req, res) => {
  req.session.destroy()
  res.redirect('..')
}

module.exports = logoutController
