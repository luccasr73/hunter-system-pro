const knex = require('../db/knex')

class Empresa {
  static criar (cnpj, nomeFantasia, ativo, descricao, transacao = null) {
    const data = {
      cnpj,
      nomeFantasia,
      ativo,
      descricao
    }
    if (transacao) {
      return transacao('empresa')
        .insert(data).returning('*')
    }
    return knex('empresa')
      .insert(data).returning('*')
  }

  static atualizar (idEmpresa, cnpj, nomeFantasia, ativo, descricao, transacao = null) {
    const data = {
      cnpj,
      nomeFantasia,
      ativo,
      descricao
    }
    if (transacao) {
      return transacao('empresa')
        .where({
          id: idEmpresa
        }).update(data)
    }
    return knex('empresa')
      .where({
        id: idEmpresa
      }).update(data)
  }

  static deletar (idEmpresa, transacao = null) {
    if (transacao) {
      return transacao('empresa')
        .where({
          id: idEmpresa
        }).del()
    }
    return knex('empresa')
      .where({
        id: idEmpresa
      }).del()
  }

  static buscar (idEmpresa, transacao = null) {
    if (transacao) {
      return transacao('empresa')
        .where({
          id: idEmpresa
        }).first()
    }
    return knex('empresa')
      .where({
        id: idEmpresa
      }).first()
  }
}

module.exports = Empresa
