var db = require("../models");
var passport = require("../config/passport");

const path = require('path')
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
        console.log(req.user, "This is API login")
    });
    app.post("/api/signup", function (req, res) {
    let newId = uuidv4();
        db.User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            id: newId
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

    app.get("/api/user_data", (req, res) => {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        res.json({
          firstname: req.user.firstname,
          id:req.user.id,
        });
      }
    });

    app.get('/api/user_data/balance', (req, res) => {
      console.log(req.user.id)
      if (req.user.id) {
        db.Accounts.findAll({
         where: {
           UserId : req.user.id
         },
          include: [db.User]
        }).then(function(dbAccounts) {
          console.log(dbAccounts, "DB_ACCOUNTS")
          res.json({balance: dbAccounts[0].account_Balance});
        });
      } else {
        res.status(401);
      }
     
    }); 

    app.get("/api/user_data/balance/:id", function(req, res) {
      db.Accounts.findOne({
        where: {
          id: req.params.id
        },
        include: [db.User]
      }).then(function(dbAccounts) {
        res.json(dbAccounts);
      });
    });

}