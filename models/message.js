const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:6,
        max: 250
    },
    subject: {
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

module.exports = mongoose.model('Message',messageSchema);