const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
        user_from: { type: String, required:true },
        user_from_id: { type: String, required:true},
        user_to: { type: String, required:true },
        user_to_id: { type: String, required:true},
        message: { type: String, required:true },
}, {
    timestamps: true,
});

const chatMessage = mongoose.model('chatMessage', chatMessageSchema);

module.exports = chatMessage;