require('dotenv').config()

console.log('port as seen in config.js', process.env.PORT)

module.exports = {
    PORT: process.env.PORT,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_HOST: process.env.PG_HOST,
    PG_DB: process.env.PG_DB,
    USER_PASS_SALT_ROUNDS: Number(process.env.SALT_ROUNDS), // || 10
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_EXPIRY: process.env.JWT_SECRET_EXPIRY || 60 * 60
}