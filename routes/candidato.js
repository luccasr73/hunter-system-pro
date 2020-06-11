const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const Login = require('../models/login')
const Candidato = require('../models/candidato')
const Endereco = require('../models/endereco')
const EnderecoCandidato = require('../models/enderecoCandidato')
const Experiencia = require('../models/experiencia')
const Template = require('../utils/Template')
const {
  middleware
} = require('../services/autenticacao')
const {
  MensagemFlash
} = require('../utils/mensagemFlash')

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
  const enderecoCandidato = await EnderecoCandidato.buscar(candidato.id)
  const endereco = await Endereco.buscar(enderecoCandidato.id_endereco)
  res.render('curriculo', {
    tituloPagina: 'Curriculo',
    candidato,
    endereco,
    usuario,
    TemplateUtils: Template
  })
})

router.post('/cadastrar', middleware.usuarioNaoEstaLogado(), async function (req, res, next) {
  const tipo = 'candidato'
  const data = req.body
  const erros = Login.validar(data)
  if (erros !== true) {
    MensagemFlash.criar(req, 'data', {
      form: data,
      erros
    })
    return res.redirect('/candidato/cadastrar')
  }

  try {
    const provedorTransacao = knex.transactionProvider()
    const transacao = await provedorTransacao()
    const idLogin = await Login.criar(
      data.usuario.trim(),
      data.senha.trim(),
      tipo,
      transacao
    )
    const candidatoId = await Candidato.criar(idLogin[0], data.email, data.nome, transacao)
    const idEndereco = await Endereco.criar({
      transaction: transacao
    })
    await EnderecoCandidato.criar(candidatoId, idEndereco, transacao)
    await transacao.commit()
    // console.log(transacao.isCompleted())
    const user = {
      usuario: data.usuario,
      senha: data.senha
    }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      }
      res.redirect('/candidato/curriculo')
    })
  } catch (error) {
    console.log(error)
    MensagemFlash.criar(req, 'data', {
      form: data,
      dbErro: error
    })
    return res.redirect('/candidato/cadastrar')
  }
})

router.get('/curriculo/geral', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const candidato = await Candidato.buscarPorIdLogin(usuario.id)
  res.json(candidato)
})

router.put('/curriculo/geral', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const data = req.body
  try {
    await Candidato.atualizar(usuario.id, {
      nome: data.nome,
      email: data.email,
      estadoCivil: data.estado_civil,
      dataNascimento: data.data_nasc,
      descricao: data.descricao,
      celular: data.celular
    })
    res.json(req.body)
  } catch (error) {
    res.json(error)
  }
})

router.get('/curriculo/endereco', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const enderecoCandidato = await EnderecoCandidato.buscar(candidato.id)
    // console.log(enderecoCandidato.id_endereco)
    const endereco = await Endereco.buscar(enderecoCandidato.id_endereco)
    // console.log(endereco)
    res.json(endereco)
  } catch (error) {
    res.status(500).send('erro')
    throw new Error(error)
  }
})

router.put('/curriculo/endereco', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const data = req.body
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const enderecoCandidato = await EnderecoCandidato.buscar(candidato.id)
    await Endereco.atualizar(enderecoCandidato.id_endereco, {
      ...data
    })
    res.json(req.body)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})

router.get('/curriculo/experiencias', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const experiencias = await Experiencia.buscar(candidato.id)
    res.json(experiencias)
  } catch (error) {
    res.status(500).send('erro')
    throw new Error(error)
  }
})

router.post('/curriculo/experiencia', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const data = req.body
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const enderecoCandidato = await EnderecoCandidato.buscar(candidato.id)
    await Endereco.atualizar(enderecoCandidato.id_endereco, {
      ...data
    })
    res.json(req.body)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})

router.put('/curriculo/experiencia/:id', middleware.usuarioEstaLogado(), async function (req, res, next) {
  const usuario = req.user
  const data = req.body
  try {
    const candidato = await Candidato.buscarPorIdLogin(usuario.id)
    const enderecoCandidato = await EnderecoCandidato.buscar(candidato.id)
    await Endereco.atualizar(enderecoCandidato.id_endereco, {
      ...data
    })
    res.json(req.body)
  } catch (error) {
    res.json(error)
    throw new Error(error)
  }
})

module.exports = router
