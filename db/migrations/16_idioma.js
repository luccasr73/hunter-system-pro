exports.up = function (knex) {
  return knex.schema.createTable('idioma', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.string('descricao').notNullable()
    table.string('nivel').notNullable()
  }).then(() => {
    console.log('tabela idioma criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('idioma')
}
