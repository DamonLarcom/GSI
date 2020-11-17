const express = require('express');
const searchRouter = express.Router();

module.exports = () => {
	searchRouter.route("/")
	.get((req, res) => {
		res.send("search");
	});
	return searchRouter;
}