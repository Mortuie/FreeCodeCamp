var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const optionSchema = new Schema({
    upvotes: {
        type: Number,
        required: true,
        default: 0,
    },
    downvotes: {
        type: Number,
        required: true,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    }
});

var pollSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: true,
    },
    options: [ optionSchema ],
});

module.exports = mongoose.model('Poll', pollSchema);

