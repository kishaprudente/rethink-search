const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const Url = require('../models/Url');

var shortUrlRoute = express.Router();

shortUrlRoute.post('/shortUrl', async (req, res) => {
  const { long } = req.body;
  const baseUrl = config.get('baseUrl');
  // if base url is not valid return error
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Something went wrong.');
  }

  // generate unique code for url
  const urlCode = shortid.generate();

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
