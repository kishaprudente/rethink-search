const mongoose = require('mongoose');
const User = require('./models/User');
const faker = require('faker');

mongoose.connect('mongodb://localhost/rethinkCodeChallenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSeed = [
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },

  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },

  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },

  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
  },
];

User.remove({})
  .then(() => User.insertMany(userSeed))
  .then((data) => {
    console.log(data);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
