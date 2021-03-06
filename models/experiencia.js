const knex = require('../db/knex')
const {
  trocaVazioPorNulo
} = require('../utils/json')

class Experiencia {
  static criar (idCandidato, cargo, nomeEmpresa, dataInicio, {
    dataFinal = null,
    transacao = null
  } = {}) {
    let data = {
      id_candidato: idCandidato,
      cargo,
      nome_empresa: nomeEmpresa,
      data_inicio: dataInicio,
      data_final: dataFinal
    }
    console.log(data)
    data = trocaVazioPorNulo(Object.keys(data), data)
    if (transacao) {
      return transacao('experiencia')
        .insert(data).returning('*')
    }
    return knex('experiencia')
      .insert(data).returning('*')
  }

  static atualizar (idExperiencia, cargo, nomeEmpresa, dataInicio, {
    dataFinal = null,
    transacao = null
  } = {}) {
    let data = {
      cargo,
      nome_empresa: nomeEmpresa,
      data_inicio: dataInicio,
      data_final: dataFinal
    }
    console.log(data)
    data = trocaVazioPorNulo(Object.keys(data), data)
    if (transacao) {
      return transacao('experiencia')
        .where({
          id: idExperiencia
        }).update(data)
    }
    return knex('experiencia')
      .where({
        id: idExperiencia
      }).update(data)
  }

  static deletar (idExperiencia, transacao = null) {
    if (transacao) {
      return transacao('experiencia')
        .where({
          id: idExperiencia
        }).del()
    }
    return knex('experiencia')
      .where({
        id: idExperiencia
      }).del()
  }

  static buscar (idExperiencia, transacao = null) {
    if (transacao) {
      return transacao('experiencia')
        .where({
          id: idExperiencia
        }).first()
    }
    return knex('experiencia')
      .where({
        id: idExperiencia
      }).first()
  }

  static buscarPorCandidato (idCandidato, transacao = null) {
    if (transacao) {
      return transacao('experiencia')
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

module.exports = Experiencia
