const express = require('express');
const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';

const session = require('express-session');

const path = require('path');
const user = require('./user.js');
const post = require('./post.js');

const app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
let sessions;


app.use(express.static(path.join(__dirname, '/html')));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/html/index.html`);
});

app.get('/home', (req, res) => {
  if (sessions && sessions.username) {
    res.sendFile(`${__dirname}/html/home.html`);
  } else {
    res.send('unauthorized');
  }
});

app.post('/signin', (req, res) => {
  sessions = req.session;
  const username = req.body.email;
  const password = req.body.password;
  user.validateSignIn(username, password, (result) => {
    if (result) {
      sessions.username = username;
      res.send('success');
    }
  });
});

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name && email && password) {
    user.signup(name, email, password);
  } else {
    res.send('Failure');
  }
});

app.post('/addpost', (req, res) => {
  const title = req.body.title;
  const subject = req.body.subject;
  post.addPost(title, subject, (result) => {
    res.send(result);
  });
});

app.post('/getpost', (req, res) => {
  post.getPost((result) => {
    res.send(result);
  });
});


app.listen(7777, () => {
  console.log('Started listening on port', 7777);
});
