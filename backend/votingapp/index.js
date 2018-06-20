var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
require('./config/db');

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("Listening on port: %d", port);
});