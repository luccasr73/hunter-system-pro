const express = require('express')
const router = express.Router()
const autenticacao = require('../services/autenticacao')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    tituloPagina: 'Inicio'
  })
})

router.get('/login', function (req, res, next) {
  res.render('login', {
    tituloPagina: 'Login'
  })
})

router.post('/login', autenticacao.passport.authenticate('login', {
  successRedirect: '/candidato/curriculo',
  failureRedirect: '/login'
  // failureFlash: true
}))

module.exports = router
