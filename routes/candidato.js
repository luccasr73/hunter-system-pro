const express = require('express')
const router = express.Router()
const Login = require('../models/login')
const { passport } = require('../services/autenticacao')
/* GET home page. */

router.get('/cadastrar', function (req, res, next) {
  // console.log(res.locals.flash)
  // res.locals.flash.message.forEach(e => {
  //   console.log(e)
  // })
  // console.log('aaaa')
  return res.render('cadastro', {
    tituloPagina: 'Criar conta',
    flash: res.locals.flash
  })
})

router.get('/curriculo', function (req, res, next) {
  console.log(req.user)
  console.log(req.isAuthenticated())
  console.log(req.session)
  res.send('aaaaaa')
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
      tipo
    )
    const user = { usuario: data.usuario, senha: data.senha }
    req.login(user, function (err) {
      // console.log(user)
      if (err) {
        console.log(err)
        return next(err)
      }
      res.redirect('/candidato/curriculo')
    })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

module.exports = router
