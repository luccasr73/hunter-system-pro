const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const Login = require('../models/login')
const Candidato = require('../models/candidato')
const Telefone = require('../models/telefone')
/* GET home page. */

router.get('/cadastrar', function (req, res, next) {
  res.render('cadastro')
})

router.post('/cadastrar', async function (req, res, next) {
  const tipo = 'candidato'
  let data = req.body
  const trx = await knex.transaction()
  try {
    const login = new Login({
      usuario: data.usuario,
      senha: data.senha,
      tipo
    })
    await login.criar(trx)
    const candidato = new Candidato({
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      dataNascimento: data['data-nascimento'],
      estadoCivil: data['estado-civil'],
      idLogin: login.getId()
    })
    await candidato.criar(trx)
    const celular = new Telefone({
      idCandidato: candidato.getId(),
      numero: data.celular,
      tipo: 1
    })
    await celular.criar(trx)
    if (data['telefone-recado']) {
      const telefoneRecado = new Telefone({
        idCandidato: candidato.getId(),
        numero: data['telefone-recado'],
        tipo: 1
      })
      await telefoneRecado.criar(trx)
    }
    await trx.commit()
    data = { idLogin: login.getId() }
    req.login(data, function (err) {
      if (err) {
        console.log(err)
      }
      return res.redirect('/curriculo')
    })
  } catch (error) {
    await trx.rollback()
    console.log(error)
    res.json(error)
  }
})

router.post('/validar', function (req, res, next) {
  const tipo = 'candidato'
  const login = new Login(req.body.usuario, req.body.senha, tipo)
  login.criar().then(e => {
    // res.send(JSON.stringify(req.body))
    res.json(e)
  })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

module.exports = router
