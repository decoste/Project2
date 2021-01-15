var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

var db = require("../models");

//ref: https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
passport.use(new localStrategy(
    {
        usernameField: "username"
    },
    function (username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password!"
                })
            }
            return done(null, dbUser);
        })
    }
))

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;