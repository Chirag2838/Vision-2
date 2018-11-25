const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema =  new Schema({
    username: String
});

const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    comment : {
        type : String,
        required : true
      }
});

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String, 
        required: true
    },
    postContent: {
        type: String, 
        required: true
    },
    postDate: {
        type: String
    },
    comments: [commentSchema],
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

postSchema.pre('remove', function(next) {
    console.log('pre remove middleware------\n');
    console.log('author ', this.author)
    // const User = mongoose.model('User');
    this.model('User').update(
        { posts: this._id }, 
        { $pull: { posts: this._id } }, 
        { multi: true }, 
        next);
    // User.findByIdAndUpdate(this.author, { $pull: { posts: this._id}})
    // User.findByIdAndRemove(this.author, { $pull: { posts: {  }}} )
    // .then(() => next())
    // .catch(err => console.log(err));
});

postSchema.post('save', function (next) {
    const User = mongoose.model('User');
    User.findByIdAndUpdate(this.author, {$push: {posts: this}})
    .then()
    .catch(err => console.log(err));
});

mongoose.model('Post', postSchema);