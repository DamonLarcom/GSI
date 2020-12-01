const express = require('express');
const postRouter = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

module.exports = () => {

	postRouter.route("/")
	.get((req, res) => {
		Post.find((err, posts) => {
			res.send(posts);
		});
	})
	.post((req, res) => {
		let post = new Post({
			user: req.user.id,
			username: req.user.username,
			text: req.body.text,
			date: Date.now(),
			likeCount: 0,
			comments: []
		});
		console.log(post);
		post.save((err, post) => {
			if (err) return console.error(err);
			console.log("Post added");
			res.json(post);
			// res.redirect(`/post/${post.id}`)
		});
		// Creates a new post with the post as the body 
		
	});

	postRouter.route("/:postId")
	.get((req, res) => {
        Post.findById(req.params.postId, (err, doc) => {
            if(err) {
                res.sendStatus(500);
            } else {
                res.send(doc);
            }
        })
	})
	.patch((req, res) => {
		// Edits a post with the post as the body
	})
	.delete((req, res) => {
        // Deletes a post with the matching PostID in the path
        Post.deleteOne({_id: req.params.postId}, err=>{
            if(err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
	});

	postRouter.route("/editPost/:postId")
	.get((req, res) => {
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