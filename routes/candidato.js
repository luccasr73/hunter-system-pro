const express = require('express')
const router = express.Router()
const Login = require('../models/login')
const Candidato = require('../models/candidato')
const { usuarioEstaLogado, usuarioNaoEstaLogado } = require('../services/autenticacao')

router.get('/cadastrar', usuarioNaoEstaLogado(), function (req, res, next) {
  // console.log(res.locals.flash)
  // res.locals.flash.message.forEach(e => {
  //   console.log(e)
  // })

  return res.render('cadastro', {
    tituloPagina: 'Criar conta',
    flash: res.locals.flash
  })
})

router.get('/curriculo', usuarioEstaLogado(), async function (req, res, next) {
  // console.log(req.user)
  // console.log(req.isAuthenticated())
  // console.log(req.session)
  const usuario = req.user
  const candidato = await Candidato.buscarPorIdLogin(usuario.id)
  res.render('curriculo', {
    tituloPagina: 'Curriculo',
    candidato
  })
})

router.get('/', usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const candidato = await Candidato.buscarPorIdLogin(usuario.id)
  res.json(candidato)
})

router.put('/', usuarioEstaLogado(), async function (req, res, next) {
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

router.post('/cadastrar', async function (req, res, next) {
  const tipo = 'candidato'
  const data = req.body
  const erros = Login.validar(data)
  if (erros !== true) {
    req.session.flash = {
      type: 'info',
      message: { form: data, erros }
    }
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
      // console.log(user)
      if (err) {
        // console.log(err)
        return next(err)
      }
      res.redirect('/candidato/curriculo')
    })
  } catch (error) {
    req.session.flash = {
      type: 'info',
      message: { form: data, dbErro: error }
    }
    return res.redirect('/candidato/cadastrar')
  }
})

module.exports = router
