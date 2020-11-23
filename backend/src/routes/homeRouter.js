const express = require('express');
const homeRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
const passport = require("passport");

passport.use(User.createStrategy());

module.exports = () => {

	homeRouter.route("/")
		.get((req, res) => {
			res.render('homePage', {});
		});
	homeRouter.route("/signup")
		.post((req, res) => {
			User.register(new User({
				username: req.body.username
			}),
				req.body.password, function (err, user) {
					if (err) {
						console.log(err);
					}
					passport.authenticate("local")(function () {
						passport.serializeUser(User.serializeUser());
						res.redirect("/secret");
					});
				});
			// create user object from params, save in user collection, log the user in, and direct them to home page
		});
	homeRouter.route("/login")
		.get((req, res) => {
			passport.authenticate("local"), {
				successRedirect: "homePage",
				failureRedirect: "loginPage"
			}, function (req, res) {
				passport.serializeUser(User.serializeUser());
			};
			// get user details from form and log them in, direct them to home page 
		});

	return homeRouter;
}