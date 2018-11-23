const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports.likesGetAll = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  console.log('GET likes' + ' for commentId ' + commentId);

  Post
    .findById(postId)
    .select('comments')
    .exec((err, post) => {
      let thisComment;
      let response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding post");
        response.status = 500;
        response.message = err;
      } else if(!post) {
        console.log("post id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "post ID not found " + id
        };
      } else {
        // Get the comment
        thisComment = post.comments.id(commentId);
        // If the comment doesn't exist Mongoose returns null
        if (!thisComment) {
          response.status = 404;
          response.message = {
            "message" : "comment ID not found " + commentId
          };
        } else {
          response.status = 200;
          response.message = thisComment.likes;
        }
      }
      
        res
          .status(response.status)
          .json(response.message);
      
    });
};

module.exports.likesToggle = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const username = req.body.username;
  console.log('Toggle likes ' + ' for commentId ' + commentId);

  Post
    .findById(postId)
    .select('comments')
    .exec((err, post) => {
      var thisComment;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding post");
        response.status = 500;
        response.message = err;
      } else if(!post) {
        console.log("post id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "post ID not found " + id
        };
      } else {
        // Get the comment
        thisComment = post.comments.id(commentId);
        // If the comment doesn't exist Mongoose returns null
        if (!thisComment) {
          response.status = 404;
          response.message = {
            "message" : "comment ID not found " + commentId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        console.log('likes', thisComment.likes);
        
        const found = thisComment.likes.find(obj => {
            return obj.username === username;
        });
        console.log('found', found);
        if(!found) {
            console.log('pushing');
            thisComment.likes.push({username: username});
        } else {
           console.log('deleting');
           thisComment.likes.id(found._id).remove();
        }
        
        post.save(function(err, postUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(200)
              .json();
          }
        });
      }
    });

};