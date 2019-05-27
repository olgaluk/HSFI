const express = require('express');

// const mongoose = require('mongoose');

const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const crypto = require('crypto');

const User = require('./db/models/User.js');
// const Vendor = require('./db/models/Vendor.js');

const app = express();

function authenticationMiddleware() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
}

function hash(text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64');
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  ((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== hash(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }),
));

passport.authenticationMiddleware = authenticationMiddleware;

app.use(express.static(path.join(__dirname, '/html')));
app.use(session({
  secret: 'some big panda',
  store: new MongoStore({
    url: 'mongodb://localhost:27017/Healthy',
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

const signin = require('./routes/signin');
const signup = require('./routes/signup');
const main = require('./routes/main');
const vendorRegistration = require('./routes/vendor-registration');
const scratchCardLicense = require('./routes/scratchCardLicense');
const scratchCard = require('./routes/scratchCard');

app.use('/signin', passport.authenticate('local'), signin);

app.use('/signup', signup);

app.use('/main', main);

app.use('/vendor-registration', passport.authenticationMiddleware(), vendorRegistration);

app.use('/scratch-card',
  passport.authenticationMiddleware(),
  scratchCard,
  scratchCardLicense);

app.listen(7777, () => {
  console.log('Started listening on port', 7777);
});
