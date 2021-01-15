var bcrypt = require("bcryptjs");
const { validateSubfields } = require('sequelize-validate-subfields');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
          },
          address2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 30]
            }
          },
		city: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 30]
            }
		},
		state: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 30]
            }
        },
        zip: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            validate: {
                len: [1, 5]
            }
		},
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        sv_account_number: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            len: [15]
        },

        sv_account_type: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 

        sv_account_Balance: {
            type: DataTypes.INTEGER.UNSIGNED,  //123,123,123,123.00
            autoIncrement: true,
            decimal: [10,2],
            created_at: sequelize.date, 
        },

        ck_account_number: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            len: [15],
        },

        ck_account_type: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 

        ck_account_balance: {
            type: DataTypes.INTEGER.UNSIGNED,  //123,123,123,123.00
            autoIncrement: true,
            decimal: [10,2], 
            created_at: sequelize.date,
        },
     
    });
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    })
    return User;
}
