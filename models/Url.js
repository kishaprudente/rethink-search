const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    // default: shortId.generate,
  },
  urlCode: {
    type: String,
    // default: shortId.generate,
  },
});

module.exports = mongoose.model('Url', urlSchema);
