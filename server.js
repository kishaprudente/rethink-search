const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors());

// app.get('/api/search', (req, res) => {});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
