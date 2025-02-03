
const express = require('express');
const mongoose = require('mongoose');
const Measurement = require('./models/Measurement');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Assignment4DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static('public'))

app.get('/api/measurements', async (req, res) => {
  const { start_date, end_date, field } = req.query;
  
  if (!start_date || !end_date || !field) {
    return res.status(400).send('Invalid query parameters');
  }
  
  const fieldMap = {
    open: 'Open',
    high: 'High',
    low: 'Low',
    close: 'Close'
  };
  
  const dbField = fieldMap[field.toLowerCase()];
  
  if (!dbField) {
    return res.status(400).send('Invalid field name');
  }
  
  try {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    const data = await Measurement.find({
      Date: { $gte: startDate, $lte: endDate },
    }).select(`Date ${dbField}`);
  
    // console.log('Fetched data:', data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server error');
  }
});


app.get('/api/measurements/metrics', async (req, res) => {
  const { field } = req.query;
  
  if (!field) {
    return res.status(400).send('Field is required');
  }
    const fieldMap = {
      open: 'Open',
      high: 'High',
      low: 'Low',
      close: 'Close'
    };
    
    const dbField = fieldMap[field.toLowerCase()];
    
    if (!dbField) {
      return res.status(400).send('Invalid field name');
    }

  try {
    const data = await Measurement.find({}).select([dbField] );

    // console.log(data)
    const values = data.map(item => item[dbField]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const stdDev = Math.sqrt(values.map(val => Math.pow(val - avg, 2)).reduce((a, b) => a + b) / values.length);

    res.json({ avg, min, max, stdDev });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

//http://localhost:3000/api/measurements?start_date=2025-01-01&end_date=2025-01-31&field=open
//
