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
    question: {
        type: String,
        require: true,
    }
});

var voteSchema = Schema({
    title: String,
    creator: String,
    options: [optionSchema],
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = {
    Vote
};