const express = require('express');
const searchRouter = express.Router();
const User = require("../models/user")
const Post = require("../models/post")

module.exports = () => {
	
	searchRouter.route("/")
	.get((req, res) => {
	});

	searchRouter.route("/user")
	.put((req, res) => {
		// get the search term and search the user collection for a partial match on usernames and re-render the page with results 
		User.find({"username": {"$regex": new RegExp(req.body.searchText, "i")}}, (err, users) => {
			if(err) console.error(err);
			res.json(users);
		})
	});

	searchRouter.route("/keyword")
	.put((req, res) => {
		// get the search term and search the post collection for a partial match on post text and re-render the page with results
		Post.find({"text": {"$regex": new RegExp(req.body.searchText, "i")}}, (err, posts) => {
			if(err) console.error(err);
			res.json(posts);
		})
	});

	return searchRouter;
}