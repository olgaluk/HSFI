const express = require('express');

const router = express.Router();

const card = require('../card.js');

router.post('/',
  (req, res, next) => {
    console.log(req.body);
    const { operatorName, date } = req.body;
    if (operatorName && date) {
      card.createCard(req.body)
        .then((result) => {
          console.log(result);
          console.log('Cards created');
          res.status(201).send('Created');
        })
        .catch((err) => {
          console.log(err.code);
          res.status(501).send('Not Implemented');
        });
    } else return next();
  });

module.exports = router;
