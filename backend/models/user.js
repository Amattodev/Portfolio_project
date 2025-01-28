const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //Firebase認証とMongoDBの紐付け
    uid: {
        type: String,
        required: true,
        unique: true
    },
    //ユーザー表示名
    username: {
        type: String,
        required: true
    },
    bio: String,
    photoURL: String,
    twitter: String,
    github: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);