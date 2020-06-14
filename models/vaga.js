const knex = require('../db/knex')

class Vaga {
  static criar (idEmpresa, cargo, tags, ativo, responsabilidades, requisitos, transacao = null) {
    const data = {
      id_empresa: idEmpresa,
      cargo,
      ativo,
      tags,
      responsabilidades,
      requisitos
    }
    if (transacao) {
      return transacao('vaga')
        .insert(data).returning('*')
    }
    return knex('vaga')
      .insert(data).returning('*')
  }

  static atualizar (idVaga, cargo, tags, responsabilidades, requisitos, transacao = null) {
    const data = {
      cargo,
      tags,
      responsabilidades,
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

  static desativar (idVaga, transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .where({
          id: idVaga
        }).update({ ativo: 0 })
    }
    return knex('vaga')
      .where({
        id: idVaga
      }).update({ ativo: 0 })
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

  static estaInscrito (idVaga, idCandidato, transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .where({
          id: idVaga,
          id_candidato: idCandidato
        }).first()
    }
    return knex('vaga')
      .where({
        id: idVaga,
        id_candidato: idCandidato
      }).first()
  }

  /* static buscarTodas (transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .where({
          ativo: 1
        })
    }
    return knex('vaga')
      .where({
        ativo: 1
      })
  } */

  static buscarTodas (transacao = null) {
    if (transacao) {
      return transacao('vaga')
        .select([
          'vaga.id as id',
          'vaga.id_empresa as id_empresa',
          'vaga.cargo',
          'vaga.tags',
          'vaga.ativo as vaga_ativo',
          'vaga.responsabilidades',
          'vaga.requisitos',
          'empresa.cnpj as empresa_cnpj',
          'empresa.nome_fantasia as empresa_nome',
          'empresa.foto as empresa_foto',
          'empresa.ativo as empresa_ativo',
          'empresa.descricao as empresa_descricao'
        ])
        .where('vaga.ativo', true)
        .where('empresa.ativo', true)
        .join('empresa', 'empresa.id', '=', 'vaga.id_empresa')
    }
    return knex('vaga')
      .select([
        'vaga.id as id',
        'vaga.id_empresa as id_empresa',
        'vaga.cargo',
        'vaga.tags',
        'vaga.ativo as vaga_ativo',
        'vaga.responsabilidades',
        'vaga.requisitos',
        'empresa.cnpj as empresa_cnpj',
        'empresa.nome_fantasia as empresa_nome',
        'empresa.foto as empresa_foto',
        'empresa.ativo as empresa_ativo',
        'empresa.descricao as empresa_descricao'
      ])
      .where('vaga.ativo', 1)
      .where('empresa.ativo', 1)
      .join('empresa', 'empresa.id', '=', 'vaga.id_empresa')
  }

  // if (transacao) {
  //   return transacao('vaga')
  //     .join('endereco_vaga', 'vaga.id', '=', 'endereco_vaga.id_vaga')
  //     .join('endereco', 'endereco.id', '=', 'endereco_vaga.id_endereco')
  //     .join('empresa', 'empresa.id', '=', 'vaga.id')
  //     .join('endereco_empresa', 'endereco_empresa.id_empresa', '=', 'empresa.id')
  //     .join('endereco', 'endereco.id', '=', 'endereco_empresa.id_endereco')
  //     .where({
  //       ativo: 1
  //     }).toSQL().toNative()
  // }
  // return knex('vaga')
  //   .join('endereco_vaga', 'vaga.id', '=', 'endereco_vaga.id_vaga')
  //   .join('endereco', 'endereco.id', '=', 'endereco_vaga.id_endereco')
  //   .join('empresa', 'empresa.id', '=', 'vaga.id')
  //   .join('endereco_empresa', 'endereco_empresa.id_empresa', '=', 'empresa.id')
  //   .join('endereco', 'endereco.id', '=', 'endereco_empresa.id_endereco')
  //   .where({
  //     ativo: 1
  //   }).toSQL().toNative()
}

module.exports = Vaga
