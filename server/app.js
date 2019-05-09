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
// const post = require('./post.js');

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

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/html/index.html`);
});

/* app.get('/home', (req, res) => {
  if (sessions && sessions.username) {
    res.sendFile(`${__dirname}/html/home.html`);
  } else {
    res.send('unauthorized');
  }
}); */


/* app.get('/main', passport.authenticationMiddleware(), renderMail);
 */

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
      if (err.toJSON().code === 11000) {
        res.status(500).send('This email already exist');
      }
    });
});


/*
app.post('/addpost', (req, res) => {
  const { title, subject } = req.body;
  post.addPost(title, subject, (result) => {
    res.send(result);
  });
});

app.post('/getpost', (req, res) => {
  post.getPost((result) => {
    res.send(result);
  });
}); */


app.listen(7777, () => {
  console.log('Started listening on port', 7777);
});
