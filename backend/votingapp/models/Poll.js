var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const optionSchema = new Schema({
    upvotes: {
        type: Number,
        required: true,
    },
    downvotes: {
        type: Number,
        required: true,
    },
    option: {
        type: String,
        require: true,
    }
});

var pollSchema = Schema({
    title: String,
    creator: String,
    options: [optionSchema],
});

module.exports = mongoose.model('Poll', pollSchema);
