const express = require('express');
const postRouter = express.Router();

module.exports = () => {
	postRouter.route("/")
	.get((req, res) => {
		res.send("post");
	})
	.post((req, res) => {
		// Creates a new post with the post as the body 
	});
	postRouter.route("/:postId")
	.patch((req, res) => {
		// Edits a post with the post as the body
	})
	.delete((req, res) => {
		// Deletes a post with the matching PostID in the path
	});
	postRouter.route("/likeToggle/:postId")
	.patch((req, res) => {
		// update post object numLike and user who liked
	});
	postRouter.route("/comment/:postId")
	.patch((req, res) => {
		// add a comment on a post
	});
	postRouter.route("/deleteCom/:postId")
	.patch((req, res) => {
		// delete comment from post
	});
	
	return postRouter;
}