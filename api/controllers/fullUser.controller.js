const mongoose = require('mongoose');
const User  = mongoose.model('User');
const Post = mongoose.model('Post');

module.exports.fullUser = (req, res) => {
    console.log(req.params.userId);

    User.findOne({'username': req.params.userId}, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            Post.find({'username': req.params.userId}, (err2, posts) => {
                if (err2) {
                    console.log(err2);
                }
                else {
                    console.log(posts);
                    const sortPost = posts.reverse();
                    res.json({user: user, posts: sortPost});
                }
            })
        }
    })
}