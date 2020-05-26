const express = require('express')
const router = express.Router()
const Login = require('../models/login')
const Candidato = require('../models/candidato')
const { middleware } = require('../services/autenticacao')
const { MensagemFlash } = require('../utils/mensagemFlash')

router.get('/cadastrar', middleware.usuarioNaoEstaLogado(), function (req, res, next) {
  const usuario = req.user
  return res.render('cadastro', {
    tituloPagina: 'Criar conta',
    flash: MensagemFlash.ler(res),
    usuario
  })
})

router.get('/curriculo', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const candidato = await Candidato.buscarPorIdLogin(usuario.id)
  res.render('curriculo', {
    tituloPagina: 'Curriculo',
    candidato,
    usuario
  })
})

router.get('/', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const candidato = await Candidato.buscarPorIdLogin(usuario.id)
  res.json(candidato)
})

router.put('/', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const data = req.body
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const c = new Candidato(usuario.id, candidato.nome, candidato.email)
    // console.log(data)
    await c.atualizar(data)
    res.json(req.body)
  } catch (error) {
    res.json(error)
  }
})

router.post('/cadastrar', middleware.usuarioNaoEstaLogado(), async function (req, res, next) {
  const tipo = 'candidato'
  const data = req.body
  const erros = Login.validar(data)
  if (erros !== true) {
    MensagemFlash.criar(req, 'data', { form: data, erros })
    return res.redirect('/candidato/cadastrar')
  }

  try {
    await Login.criar(
      data.usuario.trim(),
      data.senha.trim(),
      tipo,
      data.email,
      data.nome
    )
    const user = { usuario: data.usuario, senha: data.senha }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      res.redirect('/candidato/curriculo')
    })
  } catch (error) {
    MensagemFlash.criar(req, 'data', { form: data, dbErro: error })
    return res.redirect('/candidato/cadastrar')
  }
})

module.exports = router
