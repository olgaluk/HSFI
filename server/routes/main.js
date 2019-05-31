const express = require('express');

const router = express.Router();

const vendorController = require('../controllers/vendorController');
const cardController = require('../controllers/cardController');

router.get('/',
  (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(500).send('Internal Server Error');
      else res.status(200).send('OK');
    });
  });

// POST request for creating Vendor
router.post('/vendor-registration', vendorController.vendor_create_post);

// POST request for creating Card
router.post('/scratch-card', cardController.card_create_post);

router.get('/scratch-card', vendorController.vendor_find_get, cardController.card_last_number_get);
module.exports = router;
