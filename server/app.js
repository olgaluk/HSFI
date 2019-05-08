const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const user = require('./user.js');
// const post = require('./post.js');

const app = express();

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

// let sessions;

app.use(express.static(path.join(__dirname, '/html')));

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
});
*/
app.post('/signin', (req, res, next) => {
  if (req.session.user) return res.send(req.session.user);

  user.checkUser(req.body)
    .then((users) => {
      if (users) {
        req.session.user = { id: users._id, name: users.name };
        console.log(req.session.user);
        res.send(users);
      } else {
        return next(error);
      }
    })
    .catch(error => next(error));
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


/* app.post('/signup', (req, res) => {
  const {
    position,
    name,
    email,
    password,
    phone,
    country,
    organization,
    task,
  } = req.body;

  if (name && email && password) {
    user.signup(position, name, email, password, phone, country, organization, task);
    res.send('success');
  } else {
    res.send('Failure');
  }
});

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
