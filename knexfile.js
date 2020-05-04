const path = require('path')
const env = require('./env')
module.exports = {
  DEV: {
    client: 'mysql',
    connection: {
      database: env.DEV_DB_DBNAME,
      user: env.DEV_DB_USER,
      password: env.DEV_DB_PASS,
      host: env.DEV_DB_HOST
    },
    migrations: {
      directory: './db/migrations'
    }
  },
  DEV_SQLITE: {
    client: 'sqlite3',
    connection: {
      filename: path.join('./', env.DEV_SQLITE_DB_NAME)
    },
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  PROD: {
    client: 'mysql',
    connection: {
      database: env.PROD_DB_DBNAME,
      user: env.PROD_DB_USER,
      password: env.PROD_DB_PASS,
      host: env.PROD_DB_HOST
    },
    migrations: {
      directory: './db/migrations'
    }
  }
}
