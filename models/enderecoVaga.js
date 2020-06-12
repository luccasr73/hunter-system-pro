const knex = require('../db/knex')
class EnderecoVaga {
  static criar (idVaga, idEndereco, transaction = null) {
    if (transaction) {
      return transaction('endereco_vaga')
        .insert({
          id_vaga: idVaga,
          id_endereco: idEndereco
        }).returning('*')
    }
    return knex('endereco_vaga')
      .insert({
        id_vaga: idVaga,
        id_endereco: idEndereco
      }).returning('*')
  }

  static buscar (idVaga, transacao = null) {
    if (transacao) {
      return transacao('endereco_vaga')
        .where({
          id_vaga: idVaga
        }).first()
    }
    return knex('endereco_vaga')
      .where({
        id_vaga: idVaga
      }).first()
  }
}

module.exports = EnderecoVaga
