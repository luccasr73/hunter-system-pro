
exports.up = function (knex) {
  return knex.schema.createTable('preferencias', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.string('receber_notificacoes')
    table.boolean('receber_email')
    // table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela preferencias criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('preferencias')
}
