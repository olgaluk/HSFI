const express = require('express');

const router = express.Router();

const vendor = require('../vendor.js');

router.post('/', (req, res) => {
  vendor.createVendor(req.body)
    .then(() => {
      console.log('Vendor created');
      res.status(201).send('Created');
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(406).send('Not Acceptable');
      } else {
        res.status(501).send('Not Implemented');
      }
    });
});

module.exports = router;
