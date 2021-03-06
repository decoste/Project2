require("dotenv").config();
var express = require("express");
var session = require("express-session");

var passport = require("./config/passport");

var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);
require("./routes/AccountRoutes.js")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("connented to port" + PORT)
  })
});



