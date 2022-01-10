const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        options: {
            type: String,
            enum: ['anime', 'manga', 'op'],
            default: 'anime',
        },
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);