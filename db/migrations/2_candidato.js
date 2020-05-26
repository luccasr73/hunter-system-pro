exports.up = function (knex) {
  return knex.schema.createTable('candidato', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_endereco').unsigned().notNullable()
      .references('id').inTable('endereco')
    table.integer('id_login').unsigned().notNullable()
      .references('id').inTable('login')

    table.string('nome').notNullable()
    table.date('data_nasc')
    // table.string('cpf')
    table.string('estado_civil')
    table.string('foto')
    table.string('titulo')
    table.string('celular')
    table.string('email').notNullable().unique()
    // table.timestamp('criado').defaultTo(knex.fn.now())
    // table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela candidato criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('candidato')
}
