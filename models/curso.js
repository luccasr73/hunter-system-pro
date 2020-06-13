const knex = require('../db/knex')

class Curso {
  static criar (idCandidato, nome, instituicao, dataFormacao, transacao = null) {
    const data = {
      id_candidato: idCandidato,
      nome,
      instituicao,
      data_formacao: dataFormacao
    }
    console.log(data)
    if (transacao) {
      return transacao('curso')
        .insert(data).returning('*')
    }
    return knex('curso')
      .insert(data).returning('*')
  }

  static atualizar (idCurso, nome, instituicao, dataFormacao, transacao = null) {
    const data = {
      nome,
      instituicao,
      data_formacao: dataFormacao
    }
    if (transacao) {
      return transacao('curso')
        .where({
          id: idCurso
        }).update(data)
    }
    return knex('curso')
      .where({
        id: idCurso
      }).update(data)
  }

  static deletar (idCurso, transacao = null) {
    if (transacao) {
      return transacao('curso')
        .where({
          id: idCurso
        }).del()
    }
    return knex('curso')
      .where({
        id: idCurso
      }).del()
  }

  static buscar (idCurso, transacao = null) {
    if (transacao) {
      return transacao('curso')
        .where({
          id: idCurso
        }).first()
    }
    return knex('curso')
      .where({
        id: idCurso
      }).first()
  }

  static buscarPorCandidato (idCandidato, transacao = null) {
    if (transacao) {
      return transacao('curso')
        .where({
          id_candidato: idCandidato
        })
    }
    return knex('curso')
      .where({
        id_candidato: idCandidato
      })
  }
}

module.exports = Curso
