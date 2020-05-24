const bcrypt = require('bcryptjs')
const knex = require('../db/knex')
const Joi = require('joi')
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

  static criar (usuario, senha, tipo, transaction = null) {
    if (this.id != null) {
      return 'err'
    }
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(senha, salt)
    if (transaction) {
      return knex('login')
        .transacting(transaction)
        .insert({
          usuario: usuario,
          senha: hash,
          tipo: tipo
        }).returning('*')
    }
    return knex('login')
      .insert({
        usuario: usuario,
        senha: hash,
        tipo: tipo
      }).returning('*')
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
    // console.log(JSON.stringify(data))
    try {
      const schema = Joi.object({
        usuario: Joi.string()
          .min(5)
          .required(),
        senha: Joi.string()
          // eslint-disable-next-line no-useless-escape
          // referencia https://regexr.com/39agr
          .regex(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
          .required(),
        'confirmar-senha': Joi.ref('senha')
      })
      const {
        error
        // value
      } = schema.validate(data, {
        abortEarly: false
      })
      if (error) {
        const arrErrors = error.details.map(err => {
          const msg = new MensagemErro(err.type, err.context)
          return msg.gerar()
        })
        return arrErrors.filter(e => { return e != null })
      }
      return true
    } catch (error) {
      return error
    }
  }
}

module.exports = Login
