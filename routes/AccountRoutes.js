// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
 
      app.post("/api/user_data/balance", function(req, res) {
        console.log("BALANCE!!!!!", req.body);
        db.Accounts.update(req.body,
          {
            where: {
              UserId: req.user.id
            }
          })
          .then(function(dbPost) {
            res.json(dbPost);
          });
      });
      app.post("/api/user_data/balance/withdraw", function(req, res) {
        console.log("BALANCE!!!!!", req.body);
        db.Accounts.update(req.body,
          {
            where: {
              UserId: req.user.id
            }
          })
          .then(function(dbPost) {
            res.json(dbPost);
          });
      });
};
