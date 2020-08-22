const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        min:6,
        max: 250
    },
    title: {
        type: String,
        required: true,
        min:6,
        max: 250
    
    },
    content: {
        type: String,
        required: true,
        max: 2500,
        min:6
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Post',postSchema);