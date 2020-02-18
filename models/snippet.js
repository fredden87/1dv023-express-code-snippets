/**
 * Mongoose model Snippet.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Schema representing a code snippet.
const snippetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

// Create a model using the schema.
const Snippet = mongoose.model('Snippet', snippetSchema)

// Exports.
module.exports = Snippet
