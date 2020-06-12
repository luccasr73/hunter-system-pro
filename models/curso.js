const knex = require('../db/knex')

class Curso {
  static criar (idCandidato, nome, instituicao, dataFormacao, transacao = null) {
    const data = {
      id_candidato: idCandidato,
      nome,
      instituicao,
      data_formacao: dataFormacao
    }
    if (transacao) {
      return transacao('curso')
        .insert(data).returning('*')
    }
    return knex('curso')
      .insert(data).returning('*')
  }

  static atualizar (idExperiencia, cargo, nomeEmpresa, dataInicio, {
    dataFinal = null,
    transacao = null
  } = {}) {
    const data = {
      cargo,
      nome_empresa: nomeEmpresa,
      data_inicio: dataInicio,
      data_final: dataFinal
    }
    if (transacao) {
      return transacao('curso')
        .where({
          id: idExperiencia
        }).update(data)
    }
    return knex('curso')
      .where({
        id: idExperiencia
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
    return knex('experiencia')
      .where({
        id_candidato: idCandidato
      })
  }
}

module.exports = Curso
