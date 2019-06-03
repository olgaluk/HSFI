const express = require('express');

const router = express.Router();

const vendorController = require('../controllers/vendorController');
const cardController = require('../controllers/cardController');
const callController = require('../controllers/callController');

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

router.post('/hotline',
  callController.call_create_post,
  callController.call_find_caller,
  callController.call_create_flag);

module.exports = router;
