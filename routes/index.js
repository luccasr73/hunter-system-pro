var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'teste' })
})

router.post('/login', function (req, res, next) {
  res.render('index', { title: 'teste' })
})

module.exports = router
