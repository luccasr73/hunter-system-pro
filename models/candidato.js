const knex = require('../db/knex')
const Joi = require('joi')
class Candidato {
  constructor (data) {
    this.nome = data.nome
    this.cpf = data.cpf
    this.dataNascimento = data.dataNascimento
    this.estadoCivil = data.estadoCivil
    this.email = data.email
    this.id = data.id
    this.idLogin = data.idLogin
  }

  criar (transaction = null) {
    if (this.id != null) {
      return 'err'
    }
    if (transaction) {
      return knex('candidato')
        .transacting(transaction)
        .insert({
          nome: this.nome,
          cpf: this.cpf,
          data_nasc: this.dataNascimento.split('/').reverse().join('-'),
          estado_civil: this.estadoCivil,
          email: this.email,
          id_login: this.idLogin
        }).then(e => {
          this.setId(e)
        })
    }
    return knex('candidato')
      .insert({
        nome: this.nome,
        cpf: this.cpf,
        data_nasc: this.dataNascimento.split('/').reverse().join('-'),
        estado_civil: this.estadoCivil,
        email: this.email,
        id_login: this.idLogin
      }).then(e => {
        this.setId(e)
      })
  }

  setId (id) {
    this.id = id
  }

  getId () {
    return this.id
  }

  buscarPorId () {
    return knex.select().from('candidato').where({
      id: this.id
    }).first()
  }

  buscarPorIdLogin () {
    return knex.select().from('candidato').where({
      id_login: this.idLogin
    }).first()
  }
}

module.exports = Candidato
