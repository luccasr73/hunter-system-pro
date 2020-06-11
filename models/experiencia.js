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

  static buscarTodas (idExperiencia, transacao = null) {
    if (transacao) {
      return transacao('experiencia')
        .where({
          id: idExperiencia
        })
    }
    return knex('experiencia')
      .where({
        id: idExperiencia
      })
  }
}

module.exports = Experiencia
