const knex = require('../db/knex')

class Candidato {
  constructor (idLogin, nome, email, dataNascimento = null, estadoCivil = null, descricao = null, id = null) {
    this.nome = nome
    this.descricao = descricao
    this.dataNascimento = dataNascimento
    this.estadoCivil = estadoCivil
    this.email = email
    this.id = id
    this.idLogin = idLogin
  }

  static criar (idLogin, email, nome, transaction = null) {
    if (transaction) {
      console.log(email)
      console.log(nome)
      return transaction('candidato')
        .insert({
          id_login: idLogin,
          email,
          nome
        })
    }
    return knex('candidato')
      .insert({
        id_login: idLogin,
        email,
        nome
      })
  }

  atualizar (data) {
    // nome, email, dataNascimento = null, descricao = null, estado_civil = null, foto = null
    console.log('rodou')
    console.log(data)
    // console.log(dataNascimento)
    if (data.data_nasc === '') {
      data.data_nasc = null
    }
    if (data.estado_civil === 'null') {
      data.estado_civil = null
    }
    return knex('candidato').where({
      id_login: this.idLogin
    }).update(
      data
    )
  }

  setId (id) {
    this.id = id
  }

  getId () {
    return this.id
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
