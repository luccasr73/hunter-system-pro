const knex = require('../db/knex')
const { trocaVazioPorNulo } = require('../utils/json')
class Candidato {
  /* constructor (idLogin, nome, email, dataNascimento = null, estadoCivil = null, descricao = null, id = null) {
    this.nome = nome
    this.descricao = descricao
    this.dataNascimento = dataNascimento
    this.estadoCivil = estadoCivil
    this.email = email
    this.id = id
    this.idLogin = idLogin
  } */

  static criar (idLogin, email, nome, transaction = null) {
    if (transaction) {
      return transaction('candidato')
        .insert({
          id_login: idLogin,
          email,
          nome
        }).returning('*')
    }
    return knex('candidato')
      .insert({
        id_login: idLogin,
        email,
        nome
      }).returning('*')
  }

  static atualizar (id, { nome, email, dataNascimento = null, estadoCivil = null, descricao = null } = {}) {
    // nome, email, dataNascimento = null, descricao = null, estado_civil = null, foto = null
    // console.log(id)
    let data = { nome, email, data_nasc: dataNascimento, estado_civil: estadoCivil, descricao }
    data = trocaVazioPorNulo(Object.keys(data), data)
    // console.log(data)
    return knex('candidato').where({
      id_login: id
    }).update(
      data
    )
  }

  static buscarPorId (id) {
    return knex.select().from('candidato').where({
      id
    }).first()
  }

  static buscarPorIdLogin (idLogin) {
    return knex.select().from('candidato').where({
      id_login: idLogin
    }).first()
  }
}

module.exports = Candidato
