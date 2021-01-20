  
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");


module.exports = function(app) {

    app.get("/", function(req, res) {
      // If the user already has an account send them to the search page
      if (req.user) {
     console.log("home!")
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
      console.log("You should sign up.")
  
    });
  
    app.get("/login", function(req, res) {
      // If the user already has an account send them to the members page
      if (req.user) {
  console.log("You are logged!!")
      }
      res.sendFile(path.join(__dirname, "../public/login.html"));
    
    });
}