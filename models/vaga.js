const knex = require('../db/knex')

class Vaga {
  static criar (idEmpresa, cargo, tags, ativo, resposabilidades, requisitos, transacao = null) {
    const data = {
      id_empresa: idEmpresa,
      cargo,
      ativo,
      tags,
      resposabilidades,
      requisitos
    }
    if (transacao) {
      return transacao('vaga')
        .insert(data).returning('*')
    }
    return knex('vaga')
      .insert(data).returning('*')
  }

  static atualizar (idVaga, cargo, tags, resposabilidades, requisitos, transacao = null) {
    const data = {
      cargo,
      tags,
      resposabilidades,
      requisitos
    }
    if (transacao) {
      return transacao('vaga')
        .where({
          id: idVaga
        }).update(data)
    }
    return knex('vaga')
      .where({
        id: idVaga
      }).update(data)
  }

  static deletar (idVaga, transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .where({
          id: idVaga
        }).del()
    }
    return knex('vaga')
      .where({
        id: idVaga
      }).del()
  }

  static buscar (idVaga, transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .where({
          id: idVaga
        }).first()
    }
    return knex('vaga')
      .where({
        id: idVaga
      }).first()
  }
}

module.exports = Vaga
