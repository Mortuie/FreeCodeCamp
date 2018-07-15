var mongoose = require('mongoose');
var chalk = require('chalk');

const init = function() {
  mongoose.connect(process.env.MONGOURI).then(
    () => { console.log(chalk.green("\nConnected to the database")) },
    err => {
      console.log(chalk.red("\nERROR: ", err));
      process.exit(1);
    },
  );
}


module.exports = {
  init,
};