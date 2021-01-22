// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the account page
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get("/home", function(req, res) {
    // If the user already has an account send them to the account page
   
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
   
    res.sendFile(path.join(__dirname, "../public/login.html"));
  
  });
  app.get("/signup", function(req, res) {
   
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  
  });
  
  // Here we've add our isAuthenticated to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/accounts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/accounts.html"));
  });

  app.get("/userAccount", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userAccount.html"));
  });

  app.get("/thanks", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/thanks.html"));
  });
  
};
