const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

module.exports = () => {

	userRouter.route("/blockToggle/:userToBlockId")
	.put((req, res) => {
		// Header contains UserID named Blocker and another UserID named Blockee
		User.findById(req.params.userToBlockId, (err, userToBlock) => {
			userToBlock.profile.blockedBy.push(currentUser._id);
			userToBlock.save((err, utb) => {
				if (err) return console.error(err);
				console.log(userToBlock.username + " followed.");
			});
		});
		User.findByUsername(req.user.username, (err, currentUser) => {
			currentUser.profile.blockedUsers.push(userToBlock._id);
			currentUser.save((err, cu) => {
				if (err) return console.error(err);
			});
		});
	});

	userRouter.route("/blockedUsers")
	.get((req, res) => {
		User.find({ _id: req.user._id }, function (err, userArr) {
            if (err) console.log(err)

            const blockedUsers = userArr[0].profile.blockedUsers

            const users = User.find({ user: { $in: blockedUsers } })
            users.exec(function (error, users) {
                if (error) console.log(error)
                res.send(users)
            })
        })
	});

	userRouter.route("/followToggle/:userToFollowId")
	.put((req, res) => {
		User.findById(req.params.userToFollowId, (err, userToFollow) => {
			if (err) return console.error(err);
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
		});
		User.findByUsername(req.user.username, (err, currentUser) => {
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
		User.findByIdAndDelete(
			{ '_id': req.params.userId },
			(err, user) => {
				if (err) res.sendStatus(500);
                console.log(user.username + ' deleted');
                res.sendStatus(200);
			});
    });
    
	userRouter.route("/logout")
	.get((req, res) => {
		// logs user out and redirects the page to the sign in page 
	});

	return userRouter;
}