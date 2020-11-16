const express = require('express');
const postRouter = express.Router();

module.exports = () => {
	postRouter.route("/")
	.get((req, res) => {
		res.send("post");
	});
	return postRouter;
}