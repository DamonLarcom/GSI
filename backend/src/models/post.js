const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const mongoDb = mongoose.connection;
mongoDb.on("error", console.error.bind(console, "connection error"));

let postSchema = mongoose.Schema({
	user: String,
	username: String,
	text: String,
	date: Date,
	likeCount: Number,
	comments: [
		{
			commentAuthor: String,
			commentAuthorUsername: String,
			commentText: String,
			commentDate: Date
		}
	]
});

module.exports = Post = mongoose.model("posts", postSchema);