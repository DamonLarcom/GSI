const express = require('express');
const userRouter = express.Router();

module.exports = () => {
	userRouter.route("/")
	.get((req, res) => {
		res.send("user");
	});
	return userRouter;
}