const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Подключение к MongoDB (название базы должно совпадать с твоей — Assignment4DB)
mongoose.connect('mongodb://127.0.0.1:27017/Assignment4DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🟢 Connected to MongoDB'))
.catch(err => console.error('🔴 MongoDB connection error:', err));

// Определение схемы и модели
const MeasurementSchema = new mongoose.Schema({
  Date: String,
  Open: Number,
  High: Number,
  Low: Number,
  Close: Number,
  Volume: Number,
  AdjClose: Number,
});

const Measurement = mongoose.model('Measurement', MeasurementSchema);

// Middleware
app.use(cors());
app.use(express.static('frontend/public')); // Убедись, что index.html там находится

// API endpoint для получения всех данных
app.get('/api/data', async (req, res) => {
  try {
    const data = await Measurement.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении данных', error: err });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
