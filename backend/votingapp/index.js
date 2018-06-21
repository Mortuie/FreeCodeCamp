var express = require('express');
var app = express();
var mongoose = require('mongoose');
var chalk = require('chalk');
var port = process.env.PORT || 3000;
require('./config/db');
const VoteController = require('./routes/VoteController');

app.get('/', (req, res) => {
    res.send("Hello World!");
});

VoteController(app);

app.listen(port, () => {
    console.log(chalk.green("Server running: Listening on port: " + port));
});