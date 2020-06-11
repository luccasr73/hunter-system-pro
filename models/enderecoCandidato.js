const knex = require('../db/knex')
class EnderecoCandidato {
  static criar (idCandidato, idEndereco, transaction = null) {
    if (transaction) {
      return transaction('endereco_candidato')
        .insert({
          id_candidato: idCandidato,
          id_endereco: idEndereco
        }).returning('*')
    }
    return knex('endereco_candidato')
      .insert({
        id_candidato: idCandidato,
        id_endereco: idEndereco
      }).returning('*')
  }

  static buscar (idCandidato, transacao = null) {
    if (transacao) {
      return transacao('endereco_candidato')
        .where({
          id_candidato: idCandidato
        }).first()
    }
    return knex('endereco_candidato')
      .where({
        id_candidato: idCandidato
      }).first()
  }
}

module.exports = EnderecoCandidato
