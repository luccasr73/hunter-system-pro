const bcrypt = require('bcryptjs')
const knex = require('../db/knex')
const Joi = require('joi')
const Candidato = require('../models/candidato')
const {
  MensagemErro
} = require('../utils/mensagemValidacao')

class Login {
  constructor (usuario, senha, tipo, id = null) {
    this.usuario = usuario
    this.senha = senha
    this.tipo = tipo
    this.id = id
  }

  static async criar (usuario, senha, tipo, email, nome) {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(senha, salt)
    if (tipo === 'candidato') {
      const trxProvider = knex.transactionProvider()
      const trx = await trxProvider()
      const idLogin = await trx('login')
        .insert({
          usuario: usuario,
          senha: hash,
          tipo: tipo
        }).returning('*')
      await Candidato.criar(idLogin[0], email, nome, trx)
      // await trx('candidato').insert({ id_login: idLogin[0] }).returning('*')
      await trx.commit()
      return trx.isCompleted()
    }
  }

  static buscarPorUsuario (usuario) {
    return knex.select().from('login').where({
      usuario
    }).first()
  }

  setId (id) {
    this.id = id
    return this
  }

  getId () {
    return this.id
  }

  static buscarPorId (id) {
    return knex.select()
      .from('login')
      .where({
        id
      }).first()
  }

  recuperarSenha () {

  }

  enviarEmailAtivacao () {

  }

  static validar (data) {
    const schema = Joi.object({
      usuario: Joi.string()
        .min(5)
        .required(),
      senha: Joi.string()
      // eslint-disable-next-line no-useless-escape
      // referencia https://regexr.com/39agr
        .regex(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
        .required(),
      'confirmar-senha': Joi.ref('senha'),
      email: Joi.string()
        .required()
        .email({
          tlds: {
            allow: false
          }
        }),
      nome: Joi.string()
        .required()
    })
    const { error } = schema.validate(data, {
      abortEarly: false
    })
    if (error) {
      const arrErrors = error.details.map(err => {
        const msg = new MensagemErro(err.type, err.context)
        return msg.gerar()
      })
      return arrErrors.filter(e => {
        return e != null
      })
    }
    return true
  }
}

module.exports = Login
