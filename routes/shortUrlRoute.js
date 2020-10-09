const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const Url = require('../models/Url');

var shortUrlRoute = express.Router();

// Q # 3
// Given any URL, shorten it and return a globally unique URL back to the user.
// Make sure to call out any assumptions and / or limitations in your solution.
// Assumptions:
// - length of unique code = 7 and use base62 output, we can generate 3.5 trillion possible combinations of unique code.
// - using npm package shortid, it can generate non-sequential ids.
// - I use mongodb for faster write and read of data.
// - to avoid collision with the sever, ideally we would use a distributed systems manager (e.g. ZooKeeper)
// - but for this solution I am only using a click counter and limiting the user's click to the short url
// - to avoid failure, we should run multiple instances of ZooKeeper
// - to scale, we can put data in a cache to process redirects quickly if a single link will get a heavy load of requests
// - we could also use a load balancer to distribute requests among servers.

shortUrlRoute.post('/shortUrl', async (req, res) => {
  const { long } = req.body;
  const baseUrl = config.get('baseUrl');
  // if base url is not valid return error
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Something went wrong.');
  }

  // generate unique code for url
  const urlCode = shortid.generate().slice(0, 7);

  // if url is valid
  if (validUrl.isUri(long)) {
    try {
      // find the url and return
      let newUrl = await Url.findOne({ long: long });
      // if url is in db, return the newUrl
      if (newUrl) {
        return res.status(200).json(newUrl);
      } else {
        // if not, generate shortUrl
        const short = baseUrl + '/' + urlCode;
        newUrl = new Url({
          long,
          short,
          urlCode,
          counter: 0,
        });
        // save newUrl and send back json object
        await newUrl.save();
        return res.status(201).json(newUrl);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
  } else {
    res
      .status(400)
      .json('Invalid URL. Please enter a vlaid url for shortening.');
  }
});

shortUrlRoute.get('/shortUrl', async (req, res) => {
  try {
    const shortUrls = await Url.find();
    res.json({ shortUrls: shortUrls });
  } catch (err) {
    res.status(500).json({ message: err.nessage });
  }
});

module.exports = shortUrlRoute;
