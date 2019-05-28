/* eslint-disable no-console */
const Card = require('../db/models/Card');

// Handle card create on POST
exports.card_create_post = (req, res, next) => {
  console.log(req.body);
  const { operatorName, date } = req.body;
  if (operatorName && date) {
    const createCard = cardData => new Card(cardData).save();
    createCard(req.body)
      .then((result) => {
        console.log(result);
        console.log('Cards created');
        res.status(201).send('Created');
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send('Not Implemented');
      });
  } else next();
};
