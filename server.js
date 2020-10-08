const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3001;

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors());

mongoose.connect('mongodb://localhost/rethinkCodeChallenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < User.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.json(results);
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

app.get('/api/users', paginate(User), (req, res) => {
  res.json(res.paginatedResults);
});

app.get('/api/users/:user', paginate(User), (req, res) => {
  res.json(res.paginatedResults);
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
