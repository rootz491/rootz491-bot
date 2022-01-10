const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    categories: {
        type: [String],
        default: [],
        required: true
    }
});

module.exports = mongoose.model('Subscribers', subscriberSchema);