var mongoose = require('mongoose');
var chalk = require('chalk');

mongoose.connect('mongodb://localhost/votingapp').then(
    () => { console.log(chalk.green("\nConnected to the database")) },
    err => {
        console.log(chalk.red("\nERROR: ", err));
        process.exit(1);
    },
);