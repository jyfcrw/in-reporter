var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  phone: String,
  sex: String,
  access_token: String
});

module.exports = mongoose.model('User', schema);