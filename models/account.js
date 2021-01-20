var bcrypt = require("bcryptjs");
const { validateSubfields } = require("sequelize-validate-subfields");
module.exports = function (sequelize, DataTypes) {
  var Accounts = sequelize.define("Accounts", {
    sv_account_number: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    sv_account_type: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    sv_account_Balance: {
        type: DataTypes.INTEGER.UNSIGNED,  
        decimal: [10,2],
        created_at: sequelize.date, 
        updated_at: sequelize.date,
    },
    dda_account_number: {
        type: DataTypes.INTEGER,
        unique: true,
        len: [10],
    // JSG - we want the Account to Auto Generate
    },
    dda_account_type: {
        type: DataTypes.INTEGER,
    },
    dda_account_balance: {
        type: DataTypes.INTEGER.UNSIGNED,  
        decimal: [10,2], 
        created_at: sequelize.date,
        updated_at: sequelize.date,
    },
});
Accounts.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
    };
    Accounts.addHook("beforeCreate", function (user) {
    Accounts.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
     );
    });
    return Accounts;
};