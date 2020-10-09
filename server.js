const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Url = require('./models/Url');
const config = require('config');

const app = express();
const PORT = 3001;

const userRoute = require('./routes/userRoute');
const shortUrlRoute = require('./routes/shortUrlRoute');
const { countDocuments } = require('./models/Url');

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors());

mongoose.connect('mongodb://localhost/rethinkCodeChallenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', userRoute);
app.use('/api', shortUrlRoute);

app.get(`/:urlCode`, async (req, res) => {
  try {
    const { urlCode } = req.params;
    const url = await Url.findOne({ urlCode: urlCode });
    if (url) {
      let clickCount = url.counter;
      if (clickCount >= config.allowedClick) {
        return res
          .status(400)
          .json(
            'The click count for shortcode ' +
              shortUrlCode +
              ' has passed the limit of ' +
              config.allowedClick
          );
      } else {
        clickCount++;
        await url.update({ counter: clickCount });
        url.save();
        return res.redirect(url.long);
      }
    } else {
      return res.status(400).json("The short url doesn't exists.");
    }
  } catch (err) {
    // console.error('Error while retrieving long url for urlcode ' + urlCode);
    return res.status(500).json('There is some internal error.');
  }
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
