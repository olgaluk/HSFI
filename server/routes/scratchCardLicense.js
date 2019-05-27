const express = require('express');

const router = express.Router();

const vendor = require('../vendor.js');

router.post('/',
  (req, res) => {
    const { licenseNumber } = req.body;
    vendor.getVendor(licenseNumber)
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(412).send('Precondition Failed');
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  });

module.exports = router;
