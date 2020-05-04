const express = require('express')
const router = express.Router()
const autenticacao = require('../services/autenticacao')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'teste' })
})

router.get('/login', function (req, res, next) {
  console.log(req.isAuthenticated())
  res.render('login')
})

router.post('/login', autenticacao.passport.authenticate('login', {
  successRedirect: '/candidato/perfil',
  failureRedirect: '/login'
}))

module.exports = router
