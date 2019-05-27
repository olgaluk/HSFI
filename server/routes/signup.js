const express = require('express');

const router = express.Router();

const user = require('../user.js');

router.post('/', (req, res) => {
  user.createUser(req.body)
    .then(() => {
      console.log('User created');
      res.send('success');
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(500).send('User with this email has already been created');
      }
    });
});

module.exports = router;
