exports.up = function (knex) {
  return knex.schema.createTable('login', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.string('usuario').notNullable().unique()
    table.string('senha').notNullable()
    table.string('tipo').notNullable()
    table.timestamp('criado_em').notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  }).then(() => {
    console.log('tabela login criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('login')
}
