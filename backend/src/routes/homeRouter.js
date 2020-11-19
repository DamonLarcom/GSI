const express = require('express');
const homeRouter = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const mongoDb = mongoose.connection;
mongoDb.on("error", console.error.bind(console, "connection error"));
mongoDb.on("open", () => { console.log("Connected to Mongo") })
const userSchema = mongoose.Schema({
	username: String,
	password: String,
	profile: {
		profileImage: String,
		bio: String,
		name: String,
		email: String,
		phoneNum: String,
		followedUsers: [String],
		followedBy: [String],
		blockedUsers: [String],
		blockedBy: [String],
	},
	likedPosts: [String],
	authoredPosts: [String]
});

const postSchema = mongoose.Schema({
	user: String,
	text: String,
	date: Date,
	likeCount: Number,
	comments: [
		{
			commentAuthor: String,
			commentText: String,
			commentDate: Date
		}
	]
});

User = mongoose.model("users", userSchema);
Post = mongoose.model("posts", postSchema);

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