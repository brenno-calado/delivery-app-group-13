const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.type) return res.status(err.type).json({ message: err.message });
  return res.status(500).json({ message: `Internal Error: ${err.message}` });
});

module.exports = app;
