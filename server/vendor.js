const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/Healthy');
const Vendor = require('./db/models/Vendor.js');

exports.createVendor = (vendorData) => {
  const vendor = {
    operatorName: vendorData.operatorName,
    date: vendorData.date,
    country: vendorData.country,
    vendorName: vendorData.vendorName,
    picture: vendorData.picture,
    licenseNumber: vendorData.licenseNumber,
    licensePicture: vendorData.licensePicture,
    phone: vendorData.phone,
    email: vendorData.email,
    location: vendorData.location,
    schedule: vendorData.schedule,
    ingredient: vendorData.ingredient,
    foodGroup: vendorData.foodGroup,
  };
  return new Vendor(vendor).save();
};

exports.getVendor = id => Vendor.findOne(id);
