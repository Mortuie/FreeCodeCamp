const initialise = require('./init');
const chalk = require('chalk');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const init = async () => {
  await initialise.initialiseDB();
};

init()
  .then(() => console.log(chalk.green('DB connection made.')))
  .catch(err => {
    console.log(chalk.red('DB Error: ', err));
    process.exit(1);
  });
