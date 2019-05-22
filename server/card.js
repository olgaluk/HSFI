const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/Healthy');
const Card = require('./db/models/Card');

exports.createCard = (cardData) => {
  const card = {
    operatorName: cardData.operatorName,
    date: cardData.date,
    licenseNumber: cardData.licenseNumber,
    quantity: cardData.quantity,
    serialNumber: cardData.serialNumber,
    costCard: cardData.costCard,
  };
  return new Card(card).save();
};

exports.getVendor = date => Card.findOne({ date });
