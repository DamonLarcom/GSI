const express = require('express');
const homeRouter = express.Router();
const passportMongoose = require('passport-local-mongoose');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const mongoDb = mongoose.connection;
mongoDb.on("error", console.error.bind(console, "connection error"));

let userSchema = mongoose.Schema({
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


let postSchema = mongoose.Schema({
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

userSchema.plugin(passportMongoose);
User = mongoose.model("users", userSchema);
Post = mongoose.model("posts", postSchema);
passportMongoose.use(User.createStrategy());

module.exports = () => {
	homeRouter.route("/")
		.get((req, res) => {
			res.render('homePage', {});
		});
	homeRouter.route("/signup")
		.post((req, res) => {
			User.register(new User({
				username: req.body.username
			}),
				req.body.password, function (err, user) {
					if (err) {
						console.log(err);
					}
					passport.authenticate("local")(req, res, function () {
						passportMongoose.serializeUser(User.serializeUser());
						res.redirect("/secret");
					});
				});
			// create user object from params, save in user collection, log the user in, and direct them to home page
			res.render('signUpPage', {});
		});
	homeRouter.route("/login")
		.get((req, res) => {
			passport.authenticate("local"), {
				successRedirect: "homePage",
				failureRedirect: "/login"
			}, function (req, res) {
				passportMongoose.serializeUser(User.serializeUser());
			};
			// get user details from form and log them in, direct them to home page 
			res.render('logInPage', {});
		});

	return homeRouter;
}