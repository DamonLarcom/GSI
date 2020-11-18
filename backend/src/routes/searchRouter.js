const express = require('express');
const searchRouter = express.Router();

module.exports = () => {
	
	searchRouter.route("/")
	.get((req, res) => {
		res.render('searchPage', {});
	});

	searchRouter.route("/user")
	.get((req, res) => {
		// get the search term and search the user collection for a partial match on usernames and re-render the page with results 
		res.render('searchPage', {});
	});

	searchRouter.route("/keyword")
	.get((req, res) => {
		// get the search term and search the post collection for a partial match on post text and re-render the page with results
		res.render('searchPage', {});
	});

	return searchRouter;
}