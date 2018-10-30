const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    default: 'No description was added'
  }
});

exports.Stock = mongoose.model('Stock', stockSchema);
