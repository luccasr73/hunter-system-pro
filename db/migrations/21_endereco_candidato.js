exports.up = function (knex) {
  return knex.schema.createTable('endereco_candidato', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.integer('id_endereco').unsigned().notNullable()
      .references('id').inTable('endereco')
  }).then(() => {
    console.log('tabela endereco_candidato criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco_candidato')
}
