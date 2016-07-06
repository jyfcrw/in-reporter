var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  content: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', schema);