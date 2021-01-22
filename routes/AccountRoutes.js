// Requiring our models and passport as we've configured it
const db = require("../models/accounts");
const passport = require("../config/passport");
const accounts = require("../models/accounts");

module.exports = function(app) {
 
    app.get('/api/user_data/balance', (req, res) => {
        var query = {};
        if (req.query.UserId) {
          query.id = req.query.UserId;
        }
        db.Accounts.findAll({
          where: query,
          include: [db.User]
        }).then(function(dbAccounts) {
          res.json(dbAccounts);
        });
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
};
