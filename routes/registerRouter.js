/**
 * Register routes.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/registerController')

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
router.post('/newuser', controller.newUser)
module.exports = router
