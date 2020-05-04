exports.up = function (knex) {
  return knex.schema.createTable('telefone', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.string('numero').notNullable()
    table.integer('tipo').notNullable()
    // table.timestamp('criado').defaultTo(knex.fn.now())
    // table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela telefone criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('telefone')
}
