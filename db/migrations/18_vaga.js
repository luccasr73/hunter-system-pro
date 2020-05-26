exports.up = function (knex) {
  return knex.schema.createTable('vaga', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_empresa').unsigned().notNullable()
      .references('id').inTable('empresa')
    table.string('cargo').notNullable()
    table.string('tags').notNullable()
    table.boolean('ativo')
    table.string('atividades_resposabilidades').notNullable()
    table.string('requisitos').notNullable()
    table.timestamp('criado_em').notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('atualizado_em').notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  }).then(() => {
    console.log('tabela vaga criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('vaga')
}
