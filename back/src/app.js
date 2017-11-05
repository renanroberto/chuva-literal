'use strict'

const express = require('express')
const session = require('express-session')
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Database connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://renan:renan@ds127101.mlab.com:27101/chuva-literal', {
  useMongoClient: true
}).then(() => {
  console.log('Database connected')
})
.catch(err => {
  console.log('Can\'t connect on database: ' + err.message)
})

// Session
app.use(session({
  secret: "Hey, Mobe! Hold my secret",
  resave: false,
  saveUninitialized: false
}));

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Load models
const Post = require('./models/Post')
const Admin = require('./models/Admin')

// Load routes
const postRoute = require('./routes/post-route')
const adminRoute = require('./routes/admin-route')
const logoutRoute = require('./routes/logout-route')

// Static
const views = express.static('views')
app.use(views)
app.use(history({
  disableDotRule: true,
  verbose: false
}))
app.use(views)

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use routes
app.use('/api/post', postRoute)
app.use('/api/admin', adminRoute)
app.use('/api/logout', logoutRoute)

// Page not found
app.use((req, res) => {
  res.status(404).send('Error 404: page not found')
})

module.exports = app
