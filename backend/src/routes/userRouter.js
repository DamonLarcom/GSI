const express = require('express');
const userRouter = express.Router();

module.exports = () => {
	
	userRouter.route("/")
	.get((req, res) => {
		res.render('selfUserProfilePage', {});
	});

	userRouter.route("/editUsername")
	.get((req, res) => {
		res.render('editUsernamePage', {});
	});

	userRouter.route("/editPassword")
	.get((req, res) => {
		res.render('editPasswordPage', {});
	});

	userRouter.route("/editProfile")
	.get((req, res) => {
		res.render('editProfileDetailsPage', {});
	});

	userRouter.route("/block")
	.get((req, res) => {
		res.render('blockPage', {});
	});

	userRouter.route("/blockToggle")
	.put((req, res) => {
		// Header contains UserID named Blocker and another UserID named Blockee
	});

	userRouter.route("/followToggle")
	.put((req, res) => {
		// edit both the follower and the followee to reflect new following
	});

	userRouter.route("/follow")
	.get((req, res) => {
		res.render('followPage', {});
	});

	userRouter.route("/:userId")
	.get((req, res) => {
		res.render('otherUserProfile', {});
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
		res.render('logInPage', {});
	});

	return userRouter;
}