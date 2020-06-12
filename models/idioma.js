const knex = require('../db/knex')

class Idioma {
  static criar (idCandidato, descricao, nivel, transacao = null) {
    const data = {
      id_candidato: idCandidato,
      descricao,
      nivel
    }
    if (transacao) {
      return transacao('idioma')
        .insert(data).returning('*')
    }
    return knex('idioma')
      .insert(data).returning('*')
  }

  static atualizar (idIdioma, descricao, nivel, transacao = null) {
    const data = {
      descricao,
      nivel
    }
    if (transacao) {
      return transacao('idioma')
        .where({
          id: idIdioma
        }).update(data)
    }
    return knex('idioma')
      .where({
        id: idIdioma
      }).update(data)
  }

  static deletar (idIdioma, transacao = null) {
    if (transacao) {
      return transacao('idioma')
        .where({
          id: idIdioma
        }).del()
    }
    return knex('idioma')
      .where({
        id: idIdioma
      }).del()
  }

  static buscar (idIdioma, transacao = null) {
    if (transacao) {
      return transacao('idioma')
        .where({
          id: idIdioma
        }).first()
    }
    return knex('idioma')
      .where({
        id: idIdioma
      }).first()
  }

  static buscarPorCandidato (idCandidato, transacao = null) {
    if (transacao) {
      return transacao('idioma')
        .where({
          id_candidato: idCandidato
        })
    }
    return knex('idioma')
      .where({
        id_candidato: idCandidato
      })
  }
}

module.exports = Idioma
