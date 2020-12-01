const express = require('express');
const searchRouter = express.Router();
const User = require("../models/user")

module.exports = () => {
	
	searchRouter.route("/")
	.get((req, res) => {
	});

	searchRouter.route("/user")
	.get((req, res) => {
		// get the search term and search the user collection for a partial match on usernames and re-render the page with results 
		let searchText = req.body.searchText;
		
	});

	searchRouter.route("/keyword")
	.get((req, res) => {
		// get the search term and search the post collection for a partial match on post text and re-render the page with results
	});

	return searchRouter;
}