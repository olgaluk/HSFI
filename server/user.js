const mongoose = require('mongoose');
const crypto = require('crypto');

const db = mongoose.connect('mongodb://localhost:27017/Healthy');
const User = require('./db/models/User.js');

function hash(text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64');
}

exports.createUser = (userData) => {
  const user = {
    position: userData.position,
    name: userData.name,
    email: userData.email,
    password: hash(userData.password),
    phone: userData.phone,
    organization: userData.organization,
    task: userData.task,
    country: userData.country,
  };
  return new User(user).save();
};

exports.getUser = (id) => {
  return User.findOne(id);
};
