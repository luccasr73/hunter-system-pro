const express = require('express')
const router = express.Router()
const Login = require('../models/login')
// const { passport } = require('../services/autenticacao')
/* GET home page. */

router.get('/cadastrar', function (req, res, next) {
  console.log(res.locals.flash)
  // res.locals.flash.message.forEach(e => {
  //   console.log(e)
  // })
  // console.log('aaaa')
  // res.send('')
  return res.render('cadastro', {
    tituloPagina: 'Criar conta',
    erros: res.locals.flash.message.erros,
    form: res.locals.flash.message.form
  })
})

router.get('/curriculo', function (req, res, next) {
  console.log(req.user)
  res.send('')
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
    const login = new Login({
      usuario: data.usuario,
      senha: data.senha,
      tipo
    })
    await login.criar()
    const user = { usuario: data.usuario, senha: data.senha }
    req.login(user, function (err) {
      console.log(user)
      if (err) {
        return next(err)
      }
      return res.redirect(301, '/candidato/curriculo')
    })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

module.exports = router
