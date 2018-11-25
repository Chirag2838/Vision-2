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
    blogCategory: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref:'Blog'
    }],
    following: [followingSchema],
    followers: [followersSchema]
});

mongoose.model('User', userSchema);