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
  const code = req.params;
  console.log('code', code);
  const urlCode = await Url.findOne({ urlCode: req.params.code });
  if (urlCode == null) return res.sendStatus(404);
  urlCode.save();
  res.redirect(urlCode.long);
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
