const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/authdemp');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'Lee Carter',
  resave: false,
  saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
// ====== ROUTES
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret');
});

// ======= AUTH ROUTES
app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', (req, res) => {
  req.body.username;
  req.body.password;
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.render('secret');
    });
  });
});

// ============ login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login',
}), (req, res) => {

});

//= ====== logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
