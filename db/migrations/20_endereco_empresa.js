exports.up = function (knex) {
  return knex.schema.createTable('endereco_empresa', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_empresa').unsigned().notNullable()
      .references('id').inTable('empresa')
    table.integer('id_endereco').unsigned().notNullable()
      .references('id').inTable('endereco')
  }).then(() => {
    console.log('tabela endereco_empresa criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco_empresa')
}
