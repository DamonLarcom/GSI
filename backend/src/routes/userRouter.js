const express = require('express');
const user = require('../models/user');
const userRouter = express.Router();

module.exports = () => {

	userRouter.route("/")
	.get((req, res) => {
	});

	userRouter.route("/editUsername/:userId")
	.get((req, res) => {
	});

	userRouter.route("/editPassword/:userId")
	.get((req, res) => {
	});

	userRouter.route("/editProfile/:userId")
	.get((req, res) => {
	});

	userRouter.route("/block/:userId")
	.get((req, res) => {
	});

	userRouter.route("/blockToggle")
	.put((req, res) => {
		// Header contains UserID named Blocker and another UserID named Blockee
	});

	userRouter.route("/followToggle/:userToFollowId")
	.put((req, res) => {
		let userToFollow = user.findById(req.params.userToFollowId);
		let currentUser = user.findByUsername(req.user.username);
		currentUser.profile.followedUsers[currentUser.profile.followedUsers.length] = userToFollow.id;
		userToFollow.profile.followedBy[userToFollow.profile.followedBy.length] = currentUser.id;
		userToFollow.save((err, utf) => {
            if (err) return console.error(err);
            console.log(userToFollow.username + " followed.");
		});
		currentUser.save((err, cu) => {
            if (err) return console.error(err);
        });
		req.params.userToFollowId;
	});

	userRouter.route("/following/:userId")
	.get((req, res) => {
	});

	userRouter.route("/:userId")
	.get((req, res) => {
	})
	.put((req, res) => {
		// Body contains JSON object with a User object 
	})
	.delete((req, res) => {
		// Deletes the user from the database with the path param id and redirects to log in page.
	});

	userRouter.route("/logout")
	.get((req, res) => {
		// logs user out and redirects the page to the sign in page 
	});

	return userRouter;
}