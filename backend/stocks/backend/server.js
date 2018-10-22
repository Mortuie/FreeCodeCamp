const initialise = require('./init');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

initialise.initialiseDB;

const { seedDb } = require('./seeding');

seedDb('./seeding/data.csv', 'hello world');
