exports.up = function (knex) {
  return knex.schema.createTable('empresa', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_endereco').unsigned().notNullable()
      .references('id').inTable('endereco')
    table.string('cnpj').notNullable()
    table.string('nome_fantasia').notNullable()
    table.string('foto')
    table.boolean('ativo')
    table.string('descricao').notNullable()
    table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela empresa criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('empresa')
}
