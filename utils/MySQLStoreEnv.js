const config = require('../env')
let MySQLStoreEnv
if (config.APP_MODE === 'DEV') {
  MySQLStoreEnv = {
    host: config.DEV_DB_HOST,
    port: config.DEV_DB_PORT,
    user: config.DEV_DB_USER,
    password: config.DEV_DB_PASS,
    database: config.DEV_DB_DBNAME
  }
}
if (config.APP_MODE === 'PROD') {
  MySQLStoreEnv = {
    host: config.PROD_DB_HOST,
    port: config.PROD_DB_PORT,
    user: config.PROD_DB_USER,
    password: config.PROD_DB_PASS,
    database: config.PROD_DB_DBNAME
  }
}

module.exports = MySQLStoreEnv
