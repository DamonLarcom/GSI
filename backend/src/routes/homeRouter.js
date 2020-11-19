const express = require('express');
const homeRouter = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

module.exports = () => {

	homeRouter.route("/")
	.get((req, res) => {
	});

	homeRouter.route("/signup")
	.get((req, res) => {
	})
	.post((req, res) => {
		// create user object from params, save in user collection, log the user in, and direct them to home page
	});

	homeRouter.route("/login")
	.get((req, res) => {
		// get user details from form and log them in, direct them to home page 
	});
	
	return homeRouter;
}