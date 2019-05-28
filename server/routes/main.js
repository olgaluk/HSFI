const express = require('express');

const router = express.Router();

const vendorController = require('../controllers/vendorController');
const cardController = require('../controllers/cardController');

router.get('/',
  (req, res) => {
    req.session.destroy((err) => {
      res.send('ok');
    });
  });

// POST request for creating Vendor
router.post('/vendor-registration', vendorController.vendor_create_post);

// POST request for creating Card
router.post('/scratch-card', cardController.card_create_post, vendorController.vendor_find_get);

module.exports = router;
