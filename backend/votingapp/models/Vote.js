var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = Schema({
    title: String,
    creator: String,
    options: {

    },
});

var voteModel = mongoose.model('Vote', voteSchema);

module.exports = {
    voteModel
};