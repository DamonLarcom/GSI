const express = require('express');
const homeRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
const passport = require("passport");
const { deleteOne } = require('../models/user');

passport.use(User.createStrategy());

module.exports = () => {

	homeRouter.route("/")
		.get((req, res) => {
			res.json(req.user);
		});
	homeRouter.route("/signup")
		.post((req, res) => {
			User.findOne({username: {$regex: new RegExp(`^${req.body.username}$`, "i")}}, (err, foundUser) => {
				if(err) console.error(err);
				if(foundUser) {
					res.sendStatus(400);
					console.log("someone already has this username");
				} else {
					let newUser = new User({
						username: req.body.username,
						profile: {
							profileImage: "",
							bio: "",
							name: "",
							email: "",
							phoneNum: ""
						}
					});
					User.register(newUser, req.body.password, (err2, user) => {
						if(err2) console.error(err2);
						passport.authenticate("local")(req, res, () => {
							res.json(req.user);
						});
					});
				}
			})
			
			// create user object from params, save in user collection, log the user in, and direct them to home page
		});
	homeRouter.route("/login")
		.post(passport.authenticate("local"), (req, res) => {
		    res.send(req.user);
			// get user details from form and log them in, direct them to home page 
		});
	homeRouter.route("/logout")
	.get((req, res) => {
		console.log("Hi");
		// logs user out and redirects the page to the sign in page 
		req.logout();
		res.sendStatus(200);
	});

	return homeRouter;
}