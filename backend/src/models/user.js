const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passportMongoose = require('passport-local-mongoose');


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

userSchema.plugin(passportMongoose);

userSchema.statics.serializeUser = function() {
    return function(user, cb) {
        cb(null, user.id);
    }
};

userSchema.statics.deserializeUser = function() {
    var self = this;

    return function(id, cb) {
        self.findById(id, cb);
    }
};

module.exports = User = mongoose.model("users", userSchema);