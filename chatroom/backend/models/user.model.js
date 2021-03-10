const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    occupation:
    {
        type: String
    },
    city:
    {
        type: String,
        required: true
    },
    state:
    {
        type: String,
        required: true
    },
    favorite_music_genre:
    {
        type: String
    },
    likes_sports:
    {
        type: Boolean
    },
    likes_to_travel:
    {
        type: Boolean
    }

},{
    timestamps: true,
});

const User = mongoose.model('User', userProfileSchema);

module.exports = User;