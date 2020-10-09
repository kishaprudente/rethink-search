const express = require('express');
const userRoute = express.Router();
const User = require('../models/User');

// Q # 2:
// You have over a million rows of data. You need to display this data on a web page along with a search field.
// Update search results with each character entered by the user.
// Make sure to call out any assumptions and / or limitations in your solution.

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
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

userRoute.get('/users', paginate(User), (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = userRoute;
