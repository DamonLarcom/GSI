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
			user: req.user._id,
			username: req.user.username,
			text: req.body.text,
			date: Date.now(),
			likeCount: 0,
			comments: []
		});
		post.save((err, post) => {
			if (err) return console.error(err);
			console.log("Post added");
			res.json(post);
			// res.redirect(`/post/${post.id}`)
		});
    });
    postRouter.route("/followedPosts")
    .get((req, res) => {
        console.log("Hello!");
        console.log(req.user);
        User.find({ _id: req.user._id }, function (err, users) {
            if (err) console.log(err)

            const followedUsers = users[0].profile.followedUsers

            const posts = Post.find({ user: { $in: followedUsers } })
            posts.sort({ date: -1 })
            posts.exec(function (error, posts) {
                if (error) console.log(error)
                res.send(posts)
            })
        })
    });

	postRouter.route("/editPost/:postId")
		.get((req, res) => {
		});

	postRouter.route("/likeToggle/:postId")
		.patch((req, res) => {
			// update post object numLike and user who liked
			let postToLike = Post.findById(req.params.postId);
			let currentUser = User.findByUsername(req.user.username);

			postToLike.likeCount = postToLike.likeCount + 1;
			currentUser.likedPosts[currentUser.likedPosts.length] = postToLike._id;

			postToLike.save((err, ptl) => {
				if (err) return console.error(err);
			});
			currentUser.save((err, cu) => {
				if (err) return console.error(err);
				console.log(currentUser.username + " liked post " + postToLike._id);
			});
		});

	postRouter.route("/comment/:postId")
		.patch((req, res) => {
			// add a comment on a post
		});

	postRouter.route("/deleteCom/:postId")
		.patch((req, res) => {
			// delete comment from post
		});

    postRouter.route("/:postId")
		.get((req, res) => {
			Post.findById(req.params.postId, (err, doc) => {
				if (err) {
					res.sendStatus(525);
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
			Post.deleteOne({ _id: req.params.postId }, err => {
				if (err) {
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			})
		});
	return postRouter;
}