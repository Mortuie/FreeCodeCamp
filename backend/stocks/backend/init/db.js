const mongo = require('mongoose');
const chalk = require('chalk');

exports.initialiseDB = () => {
  mongo
    .connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log(chalk.green('\nCONNECTED')))
    .catch(err => {
      console.log(chalk.red('\nERROR: ' + err));
      process.exit(1);
    });
};
