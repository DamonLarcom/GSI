const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const userRouter = express.Router();

module.exports = () => {

	userRouter.route("/blockToggle/:userToBlockId")
	.put((req, res) => {
		// Header contains UserID named Blocker and another UserID named Blockee
		User.findById(req.params.userToBlockId, (err, userToBlock) => {
			if (err) return console.error(err);
			User.findByUsername(req.user.username, (err, currentUser) => {
				if(userToBlock.profile.blockedBy.indexOf(currentUser._id) > -1) {
					userToBlock.profile.blockedBy.splice(userToBlock.profile.blockedBy.indexOf(currentUser._id), 1);
				}
				else {
					userToBlock.profile.blockedBy.push(currentUser._id);
				}
				userToBlock.save((err, utb) => {
					if (err) return console.error(err);
					console.log(userToBlock.username + " blocked/unblocked.");
				});
				if (err) return console.error(err);
				if(currentUser.profile.blockedUsers.indexOf(userToBlock._id) > -1) {
					currentUser.profile.blockedUsers.splice(currentUser.profile.blockedUsers.indexOf(userToBlock._id), 1);
				}
				else {
					currentUser.profile.blockedUsers.push(userToBlock._id);
				}
				currentUser.save((err, cu) => {
					if (err) return console.error(err);
				});
			});
		});
	});

	userRouter.route("/blockedUsers")
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) console.log(err)
            User.find({ _id: user.profile.blockedUsers}, (err, blocks) => {
                if (err) console.error(err);
                res.send(blocks);
            })
        })
    });

	userRouter.route("/followToggle/:userToFollowId")
	.put((req, res) => {
		User.findById(req.params.userToFollowId, (err, userToFollow) => {
			if (err) return console.error(err);
			User.findByUsername(req.user.username, (err, currentUser) => {
				if(userToFollow.profile.followedBy.indexOf(currentUser._id) > -1) {
					userToFollow.profile.followedBy.splice(userToFollow.profile.followedBy.indexOf(currentUser._id), 1);
				}
				else {
					userToFollow.profile.followedBy.push(currentUser._id);
				}
				userToFollow.save((err, utf) => {
					if (err) return console.error(err);
					console.log(userToFollow.username + " followed.");
				});
				if (err) return console.error(err);
				if(currentUser.profile.followedUsers.indexOf(userToFollow._id) > -1) {
					currentUser.profile.followedUsers.splice(currentUser.profile.followedUsers.indexOf(userToFollow._id), 1);
				}
				else {
					currentUser.profile.followedUsers.push(userToFollow._id);
				}
				currentUser.save((err, cu) => {
					if (err) return console.error(err);
				});
			});
		});
	});

	userRouter.route("/following/:userId")
	.get((req, res) => {
	});

	userRouter.route("/:userId")
	.get((req, res) => {
        User.findById(req.params.userId, (err, usr) => {
            if(err) {
                res.sendStatus(500);
            } else {
                res.send(usr);
            }
        });
	})
	.put((req, res) => {
        const usr = req.body.user;
        User.updateOne({_id: req.params.userId}, {profile: {...usr}}, {upsert: true}, (err, doc) => {
            if(err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
		// Body contains JSON object with a User object 
	})
	.delete((req, res) => {
		// Deletes the user from the database with the path param id and redirects to log in page.
		User.findByIdAndDelete(req.params.userId, (err, user) => {
			if (err) res.sendStatus(500);
			console.log(user.username + ' deleted');

			user.profile.followedUsers.forEach((item, index) => {
				User.findById(item, (err, foundUser) => {
					foundUser.profile.followedBy.splice(foundUser.profile.followedBy.indexOf(user._id));
					foundUser.save((err, fu) => {
						if (err) return console.error(err);
					});
				});
			});
			user.profile.followedBy.forEach((item, index) => {
				User.findById(item, (err, foundUser) => {
					foundUser.profile.followedUsers.splice(foundUser.profile.followedUsers.indexOf(user._id));
					foundUser.save((err, fu) => {
						if (err) return console.error(err);
					});
				});
			});
			user.profile.blockedUsers.forEach((item, index) => {
				User.findById(item, (err, foundUser) => {
					foundUser.profile.blockedBy.splice(foundUser.profile.blockedBy.indexOf(user._id));
					foundUser.save((err, fu) => {
						if (err) return console.error(err);
					});
				});
			});
			user.profile.blockedBy.forEach((item, index) => {
				User.findById(item, (err, foundUser) => {
					foundUser.profile.blockedBy.splice(foundUser.profile.blockedUsers.indexOf(user._id));
					foundUser.save((err, fu) => {
						if (err) return console.error(err);
					});
				});
			});
			user.likedPosts.forEach((item, index) => {
				Post.findById(item, (err, post) => {
					post.likeCount = post.likeCount - 1;
					post.save((err, fu) => {
						if (err) return console.error(err);
					});
				});
			});

			Post.deleteMany({ user: user._id }, (err, posts) => {
				if(err) console.error(err);
				for(post in posts) {
					User.find({"likedPosts": {$in: post._id}}, (err, users) => {
						if(err) console.error(err);
						for(user of users) {
							user.likedPosts.splice(user.likedPosts.indexOf(post._id), 1);
							user.save((err, userSaved) => {
								if(err) console.error(err);
							});
						}
					})
				}
			});
			res.sendStatus(200);
		});
    });
    
	

	return userRouter;
}