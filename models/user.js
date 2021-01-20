var bcrypt = require("bcryptjs");
const { validateSubfields } = require("sequelize-validate-subfields");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
        is: {
          args: ["^[a-z]+$", "i"],
          msg: "Only letters allowed",
        },
        len: {
          args: [4, 32],
          msg: "String length is not in this range",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
        is: {
          args: ["^[a-z]+$", "i"],
          msg: "Only letters allowed",
        },
        len: {
          args: [4, 32],
          msg: "String length is not in this range",
        },
      },
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 30],
          msg: "String length is not in this range",
        },
      },
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1, 30],
          msg: "String length is not in this range",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1, 30],
          msg: "String length is not in this range",
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 4],
          msg: "String length is not in this range",
        },
      },
    },
    zip: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        len: {
          args: [2, 5],
          msg: "String length is not in this range",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
        len: {
          args: [4, 14],
          msg: "String length is not in this range",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      isLowercase: true,
      isUpperCase: true,
      isDecimal: true,
      max: 20,
      min: 8,
    },

    sv_account_number: {
      type: DataTypes.INTEGER,
      unique: true,
      len: {
          args: [4,14],
          msg: "String length is not in this range"
      }
    },
    sv_account_type: {
        type: DataTypes.INTEGER,
        unique: true,
        len: {
            args: [4,14],
            msg: "String length is not in this range"
        }
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
      type: DataTypes.STRING,
    },

    dda_account_balance: {
      type: DataTypes.INTEGER.UNSIGNED,  
      decimal: [10,2], 
      created_at: sequelize.date,
      updated_at: sequelize.date,
    },

    deposit: {
      type: DataTypes.INTIGER,
    },
    //WD  (-) from account 
    withdrawal: {
        type: DataTypes.INTIGER,
    },
    //transfer (-)from account (+)to account 
    transfer: {
        type: DataTypes.INTIGER,
    }, 
      // deducts from acct (-) moves out of bank
      // wiretransfer: {
      //}, 
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
