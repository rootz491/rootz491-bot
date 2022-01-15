const mongoose = require('mongoose');

module.exports = mongoose.model('Report', {
    program: String,
    title: String,
    link: String,
    date: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});