const knex = require('../db/knex')

class EnderecoCandidato {
  static criar (idCandidato, { cep = null, logradouro = null, numero = null, bairro = null, cidade = null, uf = null, complemento = null, transaction = null } = {}) {
    if (transaction) {
      return transaction('endereco_candidato')
        .insert({
          id_candidato: idCandidato,
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          uf,
          complemento
        }).returning('*')
    }
    return knex('candidato')
      .insert({
        cep, logradouro, numero, bairro, cidade, uf, complemento
      }).returning('*')
  }

  async atualizar (data) {
    // nome, email, dataNascimento = null, descricao = null, estado_civil = null, foto = null
    console.log('rodou')
    console.log(data)
    // console.log(dataNascimento)
    if (data.data_nasc === '') {
      data.data_nasc = null
    }
    if (data.estado_civil === 'null') {
      data.estado_civil = null
    }
    return knex('endereco').where({
      id_login: this.idLogin
    }).update(
      data
    )
  }
}

module.exports = EnderecoCandidato
