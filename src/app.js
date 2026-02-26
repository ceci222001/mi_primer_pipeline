const express = require('express');
const app = express();

app.use(express.json());

const items = [
  { id: 1, name: 'Laptop', stock: 5 },
  { id: 2, name: 'Mouse', stock: 10 }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/items', (req, res) => {
  res.status(200).json(items);
});

module.exports = app;
