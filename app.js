/**
 * The starting point of the application.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const { join } = require('path')
const logger = require('morgan')
const mongoose = require('./configs/mongoose')

const app = express()

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

// Config object for express-session
const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}
// additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))
app.use(session(sessionOptions))
app.use((req, res, next) => {
  // flash messages - survives only a round trip
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  next()
})

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/snippets', require('./routes/snippetsRouter'))
app.use('/login', require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))
app.use('*', (req, res, next) => next(createError(404)))

// Error handler.
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.statusCode === 404) {
    return res.status(404).sendFile(join(__dirname, 'views', 'errors', '404.html'))
  }
  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res.status(500).sendFile(join(__dirname, 'views', 'errors', '500.html'))
  }

  // Render the error page.
  res.status(err.statusCode || 500).render('errors/error', { err })
})

// listen to provided port
app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
