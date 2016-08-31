var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  rank: { type: Number, min: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', schema);