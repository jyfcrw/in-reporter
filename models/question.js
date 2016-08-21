var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  rank: { type: Number, min: 0 },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', schema);