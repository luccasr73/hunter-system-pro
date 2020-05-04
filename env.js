require('dotenv').config()

const config = {
  APP_MODE: process.env.APP_MODE,
  PROD_DB_PORT: process.env.PROD_DB_PORT,
  PROD_DB_DBNAME: process.env.PROD_DB_DBNAME,
  PROD_DB_USER: process.env.PROD_DB_USER,
  PROD_DB_PASS: process.env.PROD_DB_PASS,
  PROD_DB_HOST: process.env.PROD_DB_HOST,
  DEV_DB_PORT: process.env.DEV_DB_PORT,
  DEV_DB_DBNAME: process.env.DEV_DB_DBNAME,
  DEV_DB_USER: process.env.DEV_DB_USER,
  DEV_DB_PASS: process.env.DEV_DB_PASS,
  DEV_DB_HOST: process.env.DEV_DB_HOST,
  DEV_SQLITE_DB_NAME: process.env.DEV_SQLITE_DB_NAME,
  SECRET_KEY: process.env.SECRET_KEY
}
module.exports = config
