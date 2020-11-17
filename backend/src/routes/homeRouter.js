const express = require('express');
const homeRouter = express.Router();

module.exports = () => {
	homeRouter.route("/")
	.get((req, res) => {
		res.send("home");
	});
	return homeRouter;
}