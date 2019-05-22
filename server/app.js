const express = require('express');

const mongoose = require('mongoose');

const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const crypto = require('crypto');
const user = require('./user.js');
const User = require('./db/models/User.js');
const vendor = require('./vendor.js');
const Vendor = require('./db/models/Vendor.js');

const app = express();

function authenticationMiddleware() {
  return function (req, res, next) {
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

/* app.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/main',
})); */

app.post('/signin', passport.authenticate('local'),
  (req, res) => {
    res.send(req.user);
  });

app.post('/signup', (req, res, next) => {
  user.createUser(req.body)
    .then((result) => {
      console.log(result);
      console.log('User created');
      res.send('success');
    })
    .catch((err) => {
      if (err) {
        res.status(500).send('This email already exist');
      }
    });
});

app.get('/main',
  (req, res) => {
    req.session.destroy((err) => {
      res.send('ok');
    });
  });

app.post('/vendor-registration', passport.authenticationMiddleware(), (req, res, next) => {
  vendor.createVendor(req.body)
    .then((result) => {
      console.log(result);
      console.log('Vendor created');
      res.send('success');
    })
    .catch((err) => {
      if (err) {
        res.status(500);
      }
    });
});

app.post('/scratch-card', passport.authenticationMiddleware(), (req, res) => {
  const { licenseNumber } = req.body;
  vendor.getVendor(licenseNumber)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(500);
      }
    });
});

app.listen(7777, () => {
  console.log('Started listening on port', 7777);
});
