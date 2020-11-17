const express = require('express');
const homeRouter = express.Router();

module.exports = () => {
	homeRouter.route("/")
	.get((req, res) => {
		res.send("home");
	});
	homeRouter.route("/signup")
	.post((req, res) => {
		// create user object from params, save in user collection, log the user in, and direct them to home page
	});
	homeRouter.route("/login")
	.get((req, res) => {
		// get user details from form and log them in, direct them to home page 
	});
	return homeRouter;
}