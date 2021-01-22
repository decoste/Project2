 // ID  - 
    // account - number
    // account type - string 
        // checking
        // savings
    // balance
    // user  - ref a user
    // ties to the user table

var bcrypt = require("bcryptjs");
const { validateSubfields } = require("sequelize-validate-subfields");

// 1 acct has many transactions "belongs to user"

module.exports = function (sequelize, DataTypes) {
    var Accounts = sequelize.define("Accounts", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1
      },
    account_type: {
        type: DataTypes.STRING(150),
        unique: true,
        // need to work on the account types
       /*choice: [
            "Checking Account",
            "Savings Account",
        ],*/
    },
    account_Balance: {
        type: DataTypes.INTEGER.UNSIGNED,  
        decimal: [10,2],
        created_at: sequelize.date, 
        updated_at: sequelize.date,
    },
    account_number: {
        type: DataTypes.INTEGER,
        unique: true,
        len: [10],
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

    Accounts.associate = function(models) {
    // This is linking to the Unq ID of the account number in the Checking and the savings
    Accounts.belongsTo(models.User, {
      foreignKey: {
        type: DataTypes.UUID
      }
    });

    Accounts.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
    };
    Accounts.addHook("beforeCreate", function (user) {
  Accounts.password = bcrypt.hashSync(
    Accounts.password,
    bcrypt.genSaltSync(10),
    null
    );
  });
};
  return Accounts;
};

