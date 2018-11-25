const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPostSchema = new mongoose.Schema({
    blogPostTitle: {
        type: String, 
        required: true
    },
    blogPostContent: {
        type: String, 
        required: true
    },
    blogPostDate: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    }	
});

blogPostSchema.post('save', function (next) {
    const User = mongoose.model('User');
    User.findByIdAndUpdate(this.author, {$push: {blogPosts: this}})
    .then()
    .catch(err => console.log(err));
});

mongoose.model('BlogPost', blogPostSchema);