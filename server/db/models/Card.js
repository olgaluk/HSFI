const mongoose = require('mongoose');

const Card = new mongoose.Schema({
  operatorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true,
  },
  costCard: {
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('Card', Card);
