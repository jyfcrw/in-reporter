var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', schema);