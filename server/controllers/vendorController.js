/* eslint-disable no-console */
const Vendor = require('../db/models/Vendor.js');

// Handle vendor create on POST
exports.vendor_create_post = (req, res) => {
  const createVendor = vendorData => new Vendor(vendorData).save();
  createVendor(req.body)
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
};

// GET request for finding one Vendor
exports.vendor_find_get = (req, res) => {
  const { licenseNumber } = req.body;
  const getVendor = number => Vendor.findOne({ licenseNumber: number });
  getVendor(licenseNumber)
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
};
