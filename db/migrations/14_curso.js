exports.up = function (knex) {
  return knex.schema.createTable('curso', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.string('nome').notNullable()
    table.string('instituicao').notNullable()
    table.date('data_formacao').notNullable()
  }).then(() => {
    console.log('tabela curso criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('curso')
}
