/**
 * The starting point of the application.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

require('dotenv').config()

const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const path = require('path')
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
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

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

// Use express-session as middleware
app.use(session(sessionOptions))
// middleware to be executed before the routes
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

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal Server Error')
})

// listen to provided port
app.listen(8000, () => console.log('Server running at http://localhost:8000'))
