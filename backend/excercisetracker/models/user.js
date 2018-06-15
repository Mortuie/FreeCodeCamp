var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
})

module.exports = mongoose.model('User', userSchema);