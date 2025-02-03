const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number, required: true },
  adjClose: { type: Number, required: true },
});

module.exports = mongoose.model('Measurement', measurementSchema);
