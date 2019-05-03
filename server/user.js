const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/Healthy';

module.exports = {
  signup(position, name, email, password, phone, country, organization, task) {
    MongoClient.connect(url, (err, datab) => {
      const db = datab.db('Healthy');
      db.collection('user').insertOne({
        position,
        name,
        email,
        password,
        phone,
        country,
        organization,
        task,
      }, (err, result) => {
        assert.equal(err, null);
        console.log('Saved the user sign up details.');
      });
    });
  },
  validateSignIn(username, password, callback) {
    MongoClient.connect(url, (err, datab) => {
      const db = datab.db('Healthy');
      console.log(username, password);
      db.collection('user').findOne({
        email: username, password,
      }, (err, user) => {
        if (user == null) {
          console.log('returning false');
          callback(false);
        } else {
          console.log('returning true');
          callback(user);
        }
      });
    });
  },

};
