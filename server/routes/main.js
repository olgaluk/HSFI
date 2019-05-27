const express = require('express');

const router = express.Router();

router.get('/',
  (req, res) => {
    req.session.destroy((err) => {
      res.send('ok');
    });
  });

module.exports = router;
