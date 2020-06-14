const express = require('express')
const router = express.Router()
const Empresa = require('../models/empresa')
const Endereco = require('../models/endereco')
const EnderecoEmpresa = require('../models/enderecoEmpresa')
const EnderecoVaga = require('../models/enderecoVaga')
const { passport, middleware } = require('../services/autenticacao')
const Vaga = require('../models/vaga')

router.get('/gerenciar-empresas', middleware.usuarioAdminEstaLogado(), function (req, res, next) {
  const usuario = req.user
  res.render('gerenciarEmpresas', {
    tituloPagina: 'Inicio',
    usuario
  })
})

router.get('/gerenciar-vagas/:id', middleware.usuarioAdminEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const idEmpresa = req.params.id
  const empresa = await Empresa.buscar(idEmpresa)
  res.render('gerenciarVagas', {
    tituloPagina: 'Inicio',
    usuario,
    empresa
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
  successRedirect: '/admin/gerenciar-empresas',
  failureRedirect: '/admin/entrar',
  failureFlash: 'Usuario e/ou senha invalido'
}))

router.get('/empresas', middleware.usuarioEstaLogado(), async function (req, res, next) {
  try {
    const empresas = await Empresa.buscarTodas()
    res.json(empresas)
  } catch (error) {
    res.status(500).send('erro')
    throw new Error(error)
  }
})

router.post('/empresa', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const data = req.body
  try {
    const idEmpresa = await Empresa.criar(data.cnpj, data.nome_fantasia, true, data.descricao)
    const idEndereco = await Endereco.criar({ ...data })
    await EnderecoEmpresa.criar(idEmpresa, idEndereco)
    data.id = idEmpresa[0]
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})
router.delete('/empresa', middleware.usuarioEstaLogado(), async function (req, res, next) {
  // const usuario = req.user
  const data = req.body
  try {
    await Empresa.desativar(data.id)
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})

router.get('/vagas', middleware.usuarioEstaLogado(), async function (req, res, next) {
  try {
    const empresas = await Vaga.buscarTodas()
    res.json(empresas)
  } catch (error) {
    res.status(500).send('erro')
    throw new Error(error)
  }
})

router.post('/vaga/:id', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const data = req.body
  const idEmpresa = req.params.id
  try {
    const idVaga = await Vaga.criar(idEmpresa, data.cargo, data.tags, true, data.responsabilidades, data.requisitos)
    const idEndereco = await Endereco.criar({ ...data })
    await EnderecoVaga.criar(idVaga, idEndereco)
    data.id = idVaga[0]
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})
router.delete('/vaga', middleware.usuarioEstaLogado(), async function (req, res, next) {
  // const usuario = req.user
  const data = req.body
  try {
    await Vaga.desativar(data.id)
    res.json(data)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})

module.exports = router
