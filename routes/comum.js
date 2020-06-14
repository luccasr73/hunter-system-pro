const express = require('express')
const router = express.Router()
const { passport, middleware } = require('../services/autenticacao')
const Vaga = require('../models/vaga')
const Empresa = require('../models/empresa')
router.get('/', function (req, res, next) {
  const usuario = req.user
  res.render('index', {
    tituloPagina: 'Inicio',
    usuario
  })
})

router.get('/entrar', middleware.usuarioNaoEstaLogado(), function (req, res, next) {
  const usuario = req.user
  // console.log(req.body)
  // console.log(req.flash('error'))

  res.render('entrar', {
    tituloPagina: 'Entrar',
    erroLogin: req.flash('error'),
    usuario
  })
})

router.get('/vagas', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  // console.log(req.body)
  // console.log(req.flash('error'))
  const vagas = await Vaga.buscarTodasComEmpresa()
  console.log(vagas)
  res.render('vagas', {
    tituloPagina: 'Vagas',
    usuario,
    vagas
  })
})

router.get('/vaga/:id', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  // console.log(req.body)
  // console.log(req.flash('error'))
  const idVaga = req.params.id
  const vaga = await Vaga.buscar(idVaga)
  const empresa = await Empresa.buscar(vaga.id_empresa)
  console.log(vaga)
  res.render('vaga', {
    tituloPagina: 'Vagas',
    usuario,
    empresa,
    vaga
  })
})

router.get('/vaga/:id/candidatar', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  // console.log(req.body)
  // console.log(req.flash('error'))
  const idVaga = req.params.id
  const vaga = await Vaga.buscar(idVaga)
  const empresa = await Empresa.buscar(vaga.id_empresa)
  console.log(vaga)
  res.render('vaga', {
    tituloPagina: 'Vagas',
    usuario,
    empresa,
    vaga
  })
})

router.get('/sair', function (req, res, next) {
  req.logout()
  res.redirect('/entrar')
})

router.post('/entrar', passport.authenticate('login', {
  successRedirect: '/candidato/curriculo',
  failureRedirect: '/entrar',
  failureFlash: 'Usuario e/ou senha invalido'
}))

module.exports = router
