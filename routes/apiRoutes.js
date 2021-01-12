var db = require("../models");
var passport = require("../config/passport");

const path = require('path')

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });
    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                //ref: https://pusher.com/tutorials/http-response-codes-part-2
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                  //ref: https://pusher.com/tutorials/http-response-codes-part-2
                res.status(401).json(err);
            });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/login");
    });

}