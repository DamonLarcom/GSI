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
                    return done(null, false);
                }
                if (!user) {
                    debug('this username does not exist');
                    return done(null, false);
                }
                else {
                    if(user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            })
        }
    ));
}