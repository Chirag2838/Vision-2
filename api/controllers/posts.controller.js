const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports.postsAddOne = (req, res) => {
    console.log('Adding new post');
    Post
        .create({
            postTitle: req.body.title,
            postContent: req.body.content,
            postDate: new Date().toDateString(),
            postTags: _splitArray(req.body.tags),
            author: req.body.author,
            username: req.body.username
        }, (err, post) => {
            if (err) {
                console.log("Error creating post");
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

module.exports.postsGetAll = (req, res) => {
    console.log('GET the posts');

    var offset = 0;
    var count = 5;
    var maxCount = 50;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
        .status(400)
        .json({
            "message" : "If supplied in querystring, count and offset must both be numbers"
        });
        return;
    }

    if (count > maxCount) {
        res
        .status(400)
        .json({
            "message" : "Count limit of " + maxCount + " exceeded"
        });
        return;
    }

    Post
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, posts) {
        if (err) {
            console.log("Error finding posts");
            res
            .status(500)
            .json(err);
        } else {
            console.log("Found posts", posts.length);
            res
            .json(posts);
        }
        });
};

module.exports.postsGetOne = (req, res) => {
    const id = req.params.postId;

    console.log('GET postId', id);

    Post
        .findById(id)
        .exec((err, doc) => {
        var response = {
            status : 200,
            message : doc
        };
        if (err) {
            console.log("Error finding post");
            response.status = 500;
            response.message = err;
        } else if(!doc) {
            console.log("postId not found in database", id);
            response.status = 404;
            response.message = {
            "message" : "post ID not found " + id
            };
        }
        res
            .status(response.status)
            .json(response.message);
        });

};

module.exports.postsUpdateOne = (req, res) => {
    const postId = req.params.postId;

    console.log('GET postId', postId);
  
    Post
      .findById(postId)
      .exec((err, post) => {
        if (err) {
          console.log("Error finding post");
          res
            .status(500)
            .json(err);
            return;
        } else if(!post) {
          console.log("postId not found in database", postId);
          res
            .status(404)
            .json({
              "message" : "post ID not found " + postId
            });
            return;
        }
  
        post.postTitle = req.body.title;
        post.postContent = req.body.content;
        post.postTags = _splitArray(req.body.tags);
  
        post
          .save((err, postUpdated)  => {
            if(err) {
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json(postUpdated);
            }
          });
  
  
      });
};

module.exports.postsDeleteOne = (req, res) => {
    const postId = req.params.postId;

    console.log('GET postId', postId);

    Post.findOneAndRemove({_id: postId}, (err, post) => {
        if (err) {
            res
            .status(500)
            .send()
        }

        const response = {
            status: 200,
            msg: {message: "Post successfully deleted"}
        };

        if(!post) {
            response.status = 404;  
            response.msg.message = "Post not found"
        } else{
            post.remove();
        }
        
        return res.status(response.status).send(response.msg);
    });
};

const _splitArray = (input) => {
    var output;
    if (input && input.length > 0) {
      output = input.split(",")
                            .map(el => el.trim());
    } else {
      output = [];
    }
    return output;
};