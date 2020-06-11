exports.up = function (knex) {
  return knex.schema.createTable('endereco_vaga', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_vaga').unsigned().notNullable()
      .references('id').inTable('vaga')
    table.integer('id_endereco').unsigned().notNullable()
      .references('id').inTable('endereco')
  }).then(() => {
    console.log('tabela endereco_vaga criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco_vaga')
}
