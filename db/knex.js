const env = require('../env')
const config = require('../knexfile.js')[env.APP_MODE]
module.exports = require('knex')(config)
