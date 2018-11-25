const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const _addComments = (req, res, post) => {
  for (key in req.body) {
    req.body = JSON.parse(key);
  }
  console.log(req.body);
    post.comments.push({
      username : req.body.username,
      comment : req.body.comment
    });
  
    post.save((err, postUpdated) => {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(postUpdated.comments[postUpdated.comments.length - 1]);
      }
    });
  
  };
  
  module.exports.commentsAddOne = (req, res) => {
  
    const id = req.params.postId;
  
    console.log('POST Comments to postId', id);
  
    Post
      .findById(id)
      .select('comments')
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
        if (doc) {
          _addComments(req, res, doc);
        } else {
          res
            .status(response.status)
            .json(response.message);
        }
      });
  
  
  };
  

//Get all comments for a post
module.exports.commentsGetAll = (req, res) => {
  const id = req.params.postId;
  console.log('GET comments for postId', id);

  Post
    .findById(id)
    .select('comments')
    .exec((err, doc) => {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding post");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("post id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "post ID not found " + id
        };
      } else {
        response.message = doc.comments ? doc.comments : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

//Delete comment for a post
module.exports.commentsDeleteOne = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  console.log('DELETE commentId ' + commentId + ' for postId ' + postId);

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
        thisComment.remove();
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

//Update comment for a post
module.exports.commentsUpdateOne = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  console.log('PUT commentId ' + commentId + ' for postId ' + postId);

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
        thisComment.comment = req.body.comment;
        post.save(function(err, postUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};