const mongoose = require('mongoose');
const User  = mongoose.model('User');
const BlogPost = mongoose.model('BlogPost');

module.exports.addCategory = (req, res) => {
    for (key in req.body) {
        req.body = JSON.parse(key);
    }
    User.findOneAndUpdate({'username': req.body.username}, {$set:{'blogCategory': req.body.category}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({success: true, message: 'Category Added', user: user});
        }
    })
}

module.exports.blogPostsAddOne = (req, res) => {
    // for (key in req.body) {
    //     req.body = JSON.parse(key);
    // }
    console.log('Adding new post');
    BlogPost
        .create({
            blogPostTitle: req.body.title,
            blogPostContent: req.body.content,
            blogPostDate: new Date().toDateString(),
            author: req.body.author,
            username: req.body.username
        }, (err, post) => {
            if (err) {
                console.log(err);
                res
                  .status(400)
                  .json(err);
              } else {
                console.log("Post created!", post);
                res
                  .status(201)
                  .json(post);
              }
        });

};

module.exports.blogPostsGetAll = (req, res) => {
    console.log('GET the posts');
    BlogPost.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        }
        else {

            const postsSorted = posts.reverse();
            res.json({success: true, message: 'Here we have the posts', posts: postsSorted});
        }
    })
};

module.exports.blogPostByUsername = (req, res) => {
    console.log(req.body);
    for (key in req.body) {
        console.log('key', key);
        req.body = key;
    }
    console.log(req.body);
    BlogPost.find({'username': req.body}, (err, blogPosts) => {
        if (err) {
            console.log(err);
        }

        else if (blogPosts.length == 0) {
            res.json({success: false, message: 'No posts found'});
        }

        else {
            const blogPostSorted = blogPosts.reverse();
            res.json({success: true, message: 'Got the Blog Posts', blogPosts: blogPostSorted});
        }
    })
}