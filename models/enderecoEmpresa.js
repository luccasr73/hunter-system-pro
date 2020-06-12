const knex = require('../db/knex')
class EnderecoEmpresa {
  static criar (idEmpresa, idEndereco, transaction = null) {
    if (transaction) {
      return transaction('endereco_empresa')
        .insert({
          id_empresa: idEmpresa,
          id_endereco: idEndereco
        }).returning('*')
    }
    return knex('endereco_empresa')
      .insert({
        id_empresa: idEmpresa,
        id_endereco: idEndereco
      }).returning('*')
  }

  static buscar (idEmpresa, transacao = null) {
    if (transacao) {
      return transacao('endereco_empresa')
        .where({
          id_empresa: idEmpresa
        }).first()
    }
    return knex('endereco_empresa')
      .where({
        id_empresa: idEmpresa
      }).first()
  }
}

module.exports = EnderecoEmpresa
