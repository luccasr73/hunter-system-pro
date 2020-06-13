const express = require('express')
const router = express.Router()
const { passport, middleware } = require('../services/autenticacao')

router.get('/', middleware.usuarioAdminEstaLogado(), function (req, res, next) {
  const usuario = req.user
  res.render('gerenciarEmpresas', {
    tituloPagina: 'Inicio',
    usuario
  })
})

router.get('/entrar', middleware.usuarioAdminNaoEstaLogado(), function (req, res, next) {
  const usuario = req.user
  // console.log(req.body)
  // console.log(req.flash('error'))
  res.render('entrar', {
    tituloPagina: 'Entrar',
    erroLogin: req.flash('error'),
    usuario
  })
})

router.get('/sair', function (req, res, next) {
  req.logout()
  res.redirect('/admin/entrar')
})

router.post('/entrar', passport.authenticate('login', {
  successRedirect: '/admin',
  failureRedirect: '/admin/entrar',
  failureFlash: 'Usuario e/ou senha invalido'
}))

module.exports = router
