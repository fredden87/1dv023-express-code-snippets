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

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
router.get('/new', controller.new)
router.post('/create', controller.create)
router.get('/:id/edit', controller.edit)

module.exports = router
