const Sequelize = require('sequelize');
const { PG_USER, PG_PASSWORD, PG_DB, PG_HOST } = require('./config')

const sequelize = new Sequelize(
    PG_DB,
    PG_USER,
    PG_PASSWORD,
    {
        host: PG_HOST,
        dialect: 'postgres',
    }
);

module.exports = sequelize;