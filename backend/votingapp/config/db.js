var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/votingapp').then(
    () => { console.log ("NO ERROR") },
    err => {
        console.log("ERROR", err);
        process.exit(1);
    },
);