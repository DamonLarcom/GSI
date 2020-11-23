const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require("../../models/user");

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {

            User.findOne({username}, (err, user) => {
                if (err) {
                    done(null, false);
                }
                if (!user) {
                    debug('this username does not exist');
                    done(null, false);
                }
                else {
                    if(user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                }
            })
        }
    ));
}