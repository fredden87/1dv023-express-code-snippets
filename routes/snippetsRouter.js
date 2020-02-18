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

router.get('/new', controller.authorize, controller.new)
router.post('/create', controller.authorize, controller.create)

router.get('/:id/edit', controller.authorize, controller.edit)
router.post('/:id/update', controller.authorize, controller.update)

router.get('/:id/remove', controller.authorize, controller.remove)
router.post('/:id/delete', controller.authorize, controller.delete)

// Exports.
module.exports = router
