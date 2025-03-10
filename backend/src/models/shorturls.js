const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const modelOptionsGen = require('../utils/model-options')
const User = require('./users')

const options = modelOptionsGen('shorturls')

const ShortUrl = db.define('shorturl',
    {
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        shorturl: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        clickCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        uniqueClicks: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT
        },
        socialShareCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: DataTypes.ENUM('directLinks', 'setLinks'),
            defaultValue: 'directLinks'
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('dateCreated')
                  ?.toISOString()
                  .slice(0, 19)
                  .replace('T', ' '); // Format: 'YYYY-MM-DD HH:mm:ss'
            },
            validate: {
                isDate: true
            }
        },
        dateLastUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('dateLastUpdated')
                  ?.toISOString()
                  .slice(0, 19)
                  .replace('T', ' ');
            },
            validate: {
                isDate: true
            }
        },
        dateLastFetched: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('dateLastFetched')
                  ?.toISOString()
                  .slice(0, 19)
                  .replace('T', ' '); 
            },
            validate: {
                isDate: true
            }
        },
        dateExpiry: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return this.getDataValue('dateExpiry')
                  ?.toISOString()
                  .slice(0, 19)
                  .replace('T', ' '); 
            },
            validate: {
                isDate: true
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
            references: {
                model: User,
                key: 'id',
                schema: options.schema
                //schema: 'shorturls'
                // model: {
                //     tableName: 'users',
                //     schema: 'your_schema_name', //both should work
                //   },
            }
        },
        premieredLink: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        categories: {
            type: DataTypes.JSON,
        },
        customTag: {
            type: DataTypes.JSON,
        },
        publicLink: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        rateLimits: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        }


    },
    {
        ...options,
        scopes: {
            addURL: {
                attributes: ["shorturl"]
            },
            fetchAllURLs: {
                attributes: ["url", "shorturl", "description"]
            },
            stats: {
                attributes: ["url", "shorturl", "clickCount", "uniqueClicks", "dateLastFetched", "categories", "customTag"]
            }
        }
    });

module.exports = ShortUrl;