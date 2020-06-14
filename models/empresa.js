const knex = require('../db/knex')

class Empresa {
  static criar (cnpj, nomeFantasia, ativo, descricao, transacao = null) {
    const data = {
      cnpj,
      nome_fantasia: nomeFantasia,
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

  static desativar (idEmpresa, transacao = null) {
    if (transacao) {
      return transacao('empresa')
        .where({
          id: idEmpresa
        }).update({ ativo: 0 })
    }
    return knex('empresa')
      .where({
        id: idEmpresa
      }).update({ ativo: 0 })
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

  static buscarTodas (transacao = null) {
    if (transacao) {
      return transacao('empresa')
        .where({
          ativo: 1
        })
    }
    return knex('empresa')
      .where({
        ativo: 1
      })
  }
}

module.exports = Empresa
