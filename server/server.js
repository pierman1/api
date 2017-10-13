const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), // created model loading here
  Company = require('./api/models/companiesModel'), // created model loading here
  jsonwebtoken = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path')

const User = require('./api/models/userModel')

mongoose.Promise = global.Promise
mongoose.connect(
  'mongodb://broker:Stekkerdoos1.@ds117965.mlab.com:17965/barbroker',
  { useMongoClient: true }
)

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(cors())

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      'RESTFULAPIs',
      function (err, decode) {
        if (err) req.user = undefined
        req.user = decode
        next()
      }
    )
  } else {
    req.user = undefined
    next()
  }
})

var routes = require('./api/routes/todoListRoutes.js')
routes(app)

// app.use(function (req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// })

app.listen(port)

console.log('RESTful API server is started on: ' + port)

// module.exports = app
