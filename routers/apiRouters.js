

// Grabbing our models

var db = require("../models");
var passport = require("../config/passport");
const path = require('path')

// Routes
// =============================================================
module.exports = function(app) {
app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
  });

  app.post('/api/signup', function(req, res) {
    db.user.create({
      email: req.body.email,
      password: req.body.password,
    })
        .then(function() {
          res.redirect(307, '/api/login');
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
  });

  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}