exports.up = function (knex) {
  return knex.schema.createTable('experiencia', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.string('cargo').notNullable()
    table.string('nome_empresa').notNullable()
    table.date('data_inicio').notNullable()
    table.date('data_final')
  }).then(() => {
    console.log('tabela experiencia criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('experiencia')
}
