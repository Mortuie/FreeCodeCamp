var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/excercise');

var db = mongoose.connection;

db.on('error', err => {
    console.log(err);
    system.exit(0);
});
db.once('open', () => {
    console.log("DB has been connected to.");
});