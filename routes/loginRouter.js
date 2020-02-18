/**
 * Login routes.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController')

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
router.post('/', controller.auth)

// Exports.
module.exports = router
