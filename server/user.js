const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/Healthy';

module.exports = {
  signup(name, email, password) {
    MongoClient.connect(url, (err, datab) => {
      const db = datab.db('Healthy');
      db.collection('user').insertOne({
        name,
        email,
        password,
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
      }, (err, result) => {
        if (result == null) {
          console.log('returning false');
          callback(false);
        } else {
          console.log('returning true');
          callback(true);
        }
      });
    });
  },

};
