const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const modelOptionsGen = require('../utils/model-options');

const User = db.define('User', {
    id: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    paymentTier: {
        type: DataTypes.ENUM('free', 'classic', 'premium'),
        defaultValue: 'free'
    },
    rateLimits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
            return this.getDataValue('dateCreated')
              ?.toISOString()
              .slice(0, 19)
              .replace('T', ' '); 
        },
        validate: {
            isDate: true
        }
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwdHash: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
{
    ...modelOptionsGen('users'),
    defaultScope: {
        attributes: { exclude: ['passwdHash'] }
      },
      scopes: {
        flatData: {
          attributes: { exclude: ["passwdHash", "dateCreated", "rateLimits", "paymentTier"] }
        },
        loginData: {
           attributes: { include: ["passwdHash", "fname", "lname"]} 
        },
        addShortURL: {
            attributes: { include: ["paymentTier"] }
        }
      }
})


module.exports = User;
