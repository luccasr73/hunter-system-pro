exports.up = function (knex) {
  return knex.schema.createTable('colaborador', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_login').unsigned().notNullable()
      .references('id').inTable('login')
    table.string('nome').notNullable()
    table.string('email').notNullable().unique()
    // table.timestamp('criado').defaultTo(knex.fn.now())
    // table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela colaborador criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('colaborador')
}
