/**
 * Snippets routes.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetsController')

// GET
router.get('/', controller.index)
router.get('/new', controller.new)

module.exports = router
