const knex = require('../db/knex')

class CandidatoVaga {
  static criar (idVaga, idCandidato, transacao = null) {
    const data = {
      id_vaga: idVaga,
      id_candidato: idCandidato
    }
    if (transacao) {
      return transacao('candidato_vaga')
        .insert(data).returning('*')
    }
    return knex('candidato_vaga')
      .insert(data).returning('*')
  }

  static selecionar (idCandidatoVaga, selecionado, transacao = null) {
    const data = {
      selecionado
    }
    if (transacao) {
      return transacao('candidato_vaga')
        .where({
          id: idCandidatoVaga
        }).update(data)
    }
    return knex('candidato_vaga')
      .where({
        id: idCandidatoVaga
      }).update(data)
  }

  static deletar (idCandidatoVaga, transacao = null) {
    if (transacao) {
      return transacao('candidato_vaga')
        .where({
          id: idCandidatoVaga
        }).del()
    }
    return knex('candidato_vaga')
      .where({
        id: idCandidatoVaga
      }).del()
  }

  static buscarTodasPorCandidato (idCandidato, transacao = null) {
    if (transacao) {
      return transacao('candidato_vaga')
        .where({
          id_candidato: idCandidato
        })
    }
    return knex('candidato_vaga')
      .where({
        id_candidato: idCandidato
      })
  }

  static estaInscrito (idVaga, idCandidato, transacao = null) {
    if (transacao) {
      return transacao('candidato_vaga')
        .where({
          id_vaga: idVaga,
          id_candidato: idCandidato
        })
        .first()
    }
    return knex('candidato_vaga')
      .where({
        id_vaga: idVaga,
        id_candidato: idCandidato
      })
      .first()
  }

  static buscar (idCandidatoVaga, transacao = null) {
    if (transacao) {
      return transacao('candidato_vaga')
        .where({
          id: idCandidatoVaga
        }).first()
    }
    return knex('candidato_vaga')
      .where({
        id: idCandidatoVaga
      }).first()
  }
}

module.exports = CandidatoVaga
