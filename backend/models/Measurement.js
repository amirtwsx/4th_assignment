const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  Open: { type: Number, required: true },
  High: { type: Number, required: true },
  Low: { type: Number, required: true },
  Close: { type: Number, required: true },
  Volume: { type: Number, required: true },
  AdjClose: { type: Number, required: true },
});

module.exports = mongoose.model('Measurement', measurementSchema);
