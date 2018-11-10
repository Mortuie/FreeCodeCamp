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
  },
  is_active: {
    type: Boolean,
    required: true,
    default: false
  }
});

exports.Stock = mongoose.model('Stock', stockSchema);
