const bcrypt = require('bcryptjs')
const knex = require('../db/knex')

class Login {
  constructor (data) {
    this.usuario = data.usuario
    this.senha = data.senha
    this.tipo = data.tipo
    this.id = data.id
    // console.log(this.usuario)
  }

  criar (transaction = null) {
    if (this.id != null) {
      return 'err'
    }
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(this.senha, salt)
    if (transaction) {
      return knex('login')
        .transacting(transaction)
        .insert({
          usuario: this.usuario,
          senha: hash,
          tipo: this.tipo
        }).returning('*')
        .then(e => {
          console.log(e)
          this.setaId(e[0])
        })
    }
    return knex('login')
      .insert({
        usuario: this.usuario,
        senha: hash,
        tipo: this.tipo
      }).returning('*')
      .then(e => {
        console.log(e)
        this.setaId(e[0])
      })
  }

  buscarPorUsuario () {
    return knex.select().from('login').where({
      usuario: this.usuario
    }).first()
  }

  setaId (id) {
    this.id = id
    return this
  }

  getId () {
    return this.id
  }

  buscarPorId () {
    return knex.select().from('login').where({
      id: this.id
    }).first()
  }

  recuperarSenha () {

  }

  enviarEmailAtivacao () {

  }
}

module.exports = Login
