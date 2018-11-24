const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const ctrlPosts = require('../controllers/posts.controller');
const ctrlComments = require('../controllers/comments.controller');
const ctrlLikes = require('../controllers/likes.controller');
const follow = require('../controllers/followUser.controller');
const search = require('../controllers/search.controller');

router
    .route('/signup')
    .post(auth.signup);

router
    .route('/signin')
    .post(auth.signin);

//post routes
router
	.route('/posts')
	.get(ctrlPosts.postsGetAll)
	.post(ctrlPosts.postsAddOne);	
	
router
	.route('/posts/:postId')
	.get(ctrlPosts.postsGetOne)
	.put(ctrlPosts.postsUpdateOne)
	.delete(ctrlPosts.postsDeleteOne);

//comment routes
router
	.route('/posts/:postId/comments')
	.get(ctrlComments.commentsGetAll)
	.post(ctrlComments.commentsAddOne);

router
	.route('/posts/:postId/comments/:commentId')
	.put(ctrlComments.commentsUpdateOne)
	.delete(ctrlComments.commentsDeleteOne);

//comment likes routes
router
	.route('/posts/:postId/comments/:commentId/likes')
	.get(ctrlLikes.likesGetAll)
	.post(ctrlLikes.likesToggle)

// router
// 	.route('/findusername')
// 	.post(username.findUsername);

router
	.route('/searchpeople')
	.post(search.searchPeople);

router
	.route('/follow')
	.post(follow.followUser);

//test routes
// router
// 	.route('/users/:userId')
// 	.get(username.getUserDetails);

module.exports = router;