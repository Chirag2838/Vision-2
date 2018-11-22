const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    username: String
});

const followersSchema = new Schema({
    username: String
});

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String,
    token: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [followingSchema],
    followers: [followersSchema]
});

mongoose.model('User', userSchema);