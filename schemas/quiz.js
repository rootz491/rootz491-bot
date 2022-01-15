const mongoose = require('mongoose');

module.exports = mongoose.model('Quiz', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    win: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
}));