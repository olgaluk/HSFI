const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/Healthy';

module.exports = {
  addPost(title, subject, callback) {
    MongoClient.connect(url, (err, datab) => {
      const db = datab.db('Healthy');
      db.collection('post').insertOne({
        title,
        subject,
      }, (err, result) => {
        assert.equal(err, null);
        console.log('Saved the blog post details.');
        if (err == null) {
          callback(true);
        } else {
          callback(false);
        }
      });
    });
  },
  getPost(callback) {
    MongoClient.connect(url, (err, datab) => {
      const db = datab.db('Healthy');
      db.collection('post', (err, collection) => {
        collection.find().toArray((err, list) => {
          callback(list);
        });
      });
    });
  },
};
