const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date() // ИСПРАВИТЬ ЭТОТ БАГ!!!
    }
});

module.exports = mongoose.model('News', NewsSchema);