const knex = require('../db/knex')
const { trocaVazioPorNulo } = require('../utils/json')
class Endereco {
  static criar ({ cep = null, logradouro = null, numero = null, bairro = null, cidade = null, uf = null, complemento = null, transaction = null } = {}) {
    if (transaction) {
      return transaction('endereco')
        .insert({
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          uf,
          complemento
        }).returning('*')
    }
    return knex('endereco')
      .insert({
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
        complemento
      }).returning('*')
  }

  static atualizar (idEndereco, { cep = null, logradouro = null, numero = null, bairro = null, cidade = null, uf = null, complemento = null, transacao = null } = {}) {
    let data = { cep, logradouro, numero, bairro, cidade, uf, complemento }
    console.log(data)
    data = trocaVazioPorNulo(Object.keys(data), data)
    if (transacao) {
      return transacao('endereco')
        .where({
          id: idEndereco
        }).update(data)
    }
    return knex('endereco')
      .where({
        id: idEndereco
      }).update(data)
  }

  static buscar (idEndereco, transacao = null) {
    console.log({ idEndereco })
    if (transacao) {
      return transacao('endereco')
        .where({
          id: idEndereco
        }).first()
    }
    return knex('endereco')
      .where({
        id: idEndereco
      }).first()
  }
}

module.exports = Endereco
