var express = require('express');
var app = express();
var db = require('./db.js');
var ExcerciseModel = require('./models/excercise.js');
var User = require('./models/user.js');
const PORT = process.env.PORT || 8000;


app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Homepage");
});

app.post('/api/excercise/new-user', (req, res) => {
    const username = req.query.username;
    console.log(username);
    if (!username) {
        return res.status(500).send({success: false, message: "No username given"});
    } else {
        const temp = new User({ username });
        temp.save((err, data) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(500).send({success: false, message: "User already exists!"});
                } else {
                    return res.status(500).send(err);
                }
            } else {
                return res.status(200).json({success: true, username, id: data._id});
            }
        });
    }
});

app.post('/api/excercise/add', (req, res) => {
    var { id, description, duration, date } = req.query;
    const dateArray = date.split('-');
    date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    const temp = new ExcerciseModel({ id, description, duration, date });

    temp.save((err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).json({success: true, details: data});
        }
    });
});

app.get('/api/excercise/log', (req, res) => {
    const { userId, dateFrom, dateTo, limit } = req.query;

    if (!userId) {
        return res.status(500).send({success: false, message: "No userid specified!"});
    } else {

        var temp = {};

        temp.id = userId;

        if (dateFrom && dateTo) {
            temp.date = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
        } else if (dateFrom) {
            temp.date = { $gte: new Date(dateFrom) };
        } else if (dateTo) {
            temp.date = { $lte: new Date(dateTo) };
        }


        ExcerciseModel.find(temp, (err, res) => {
            console.log("RESS", res);
        });
    }
    return res.send("xD");
});


app.get('/api/excercise/all', (req, res) => {
    User.find({}, (err, data) => {
        return res.status(200).json(data);
    });
});

app.listen(PORT, () => {
    console.log("Listening on port: %d", PORT);
});