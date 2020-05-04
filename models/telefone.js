const knex = require('../db/knex')

class Telefone {
  constructor (data) {
    this.numero = data.numero
    this.tipo = data.tipo
    this.id = data.id
    this.idCandidato = data.idCandidato
  }

  criar (transaction = null) {
    if (this.id != null) {
      return 'err'
    }
    if (transaction) {
      return knex('telefone')
        .transacting(transaction)
        .insert({
          numero: this.numero,
          tipo: this.tipo,
          id_candidato: this.idCandidato
        }).returning('*')
        .then(e => {
          console.log(e)
          this.setaId(e[0])
        })
    }
    return knex('telefone')
      .transacting(transaction)
      .insert({
        tipo: this.numero,
        senha: this.tipo,
        id_candidato: this.idCandidato
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
}

module.exports = Telefone
