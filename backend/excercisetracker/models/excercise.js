var mongoose = require('mongoose');

var excerciseSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        min: 0,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Excercise Model', excerciseSchema);