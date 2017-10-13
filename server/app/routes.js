// app/routes.js
const path = require('path')
const expressVue = require('express-vue')
let vueScript = 'https://unpkg.com/vue@2.4.2/dist/vue.js'

module.exports = function (app, passport) {
  const vueOptions = {
    rootPath: path.join(__dirname, '../../client'),
    vue: {
      head: {
        meta: [
          {
            script: vueScript
          },
          // { script: path.join(__dirname, 'main.js') },
          {
            style: ''
          }
        ]
      }
    }
  }

  const expressVueMiddleware = expressVue.init(vueOptions)
  app.use(expressVueMiddleware)

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  // app.get('/', function (req, res) {
  //   res.render('index.ejs') // load the index.ejs file
  // })

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') })
  })

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  )

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') })
  })

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: 'true'
    })
  )

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    })
  })

  app.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard.ejs', {
      user: req.user // get the user out of session and pass to template
    })
  })

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  app.get('/', (req, res, next) => {
    console.log('joeeeh')
    res.renderVue('app', vueOptions)
  })
}

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}
