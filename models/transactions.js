//JSg Format:
//Transactions belongs to account
    // Id
// Transaction type - string  - choice val (is type)
    // dep 
    // withdrawal
    // transfer
//amount 
//account  - ref back to accounts table
//transaction desc - string - concat - 
  //ATM WITHDRAWAL $10.75
  // Based on options selected, transaction description can be concatenated 
  // joins 
// 1 acct has many transactions "belongs to user"

var bcrypt = require("bcryptjs");
const { validateSubfields } = require("sequelize-validate-subfields");

module.exports = function (sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV1
          },
    transaction_Type: {
        type: DataTypes.STRING,  
        /*choice:[
            "Deposit",
            "Withdrawal",
            "Transfer",
        ]*/
    },
    account_Number: {
        type: DataTypes.INTEGER,
        unique: true,
        len: [10],

        //This needs to be a Join and == to the accounts Table account number
    },
    Transaction_Amount: {
        type: DataTypes.INTEGER.UNSIGNED,  
        decimal: [10,2],
        created_at: sequelize.date, 
        updated_at: sequelize.date,
        },
    });

Transactions.associate = function(models) {
    // This is linking to the Unq ID of the account number in the Checking and the savings
    Transactions.belongsTo(models.Accounts, {
     
    });

Transactions.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
Transactions.addHook("beforeCreate", function (user) {
  Transactions.password = bcrypt.hashSync(
    Transactions.password,
    bcrypt.genSaltSync(10),
    null
    );
});
};
return Transactions;
};

