exports.up = function (knex) {
  return knex.schema.createTable('endereco', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    /* table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato') */
    table.string('cep')
    table.string('logradouro')
    table.string('numero')
    table.string('bairro')
    table.string('cidade')
    table.string('uf')
    table.string('complemento')
    table.timestamp('atualizado').defaultTo(knex.fn.now())
  }).then(() => {
    console.log('tabela endereco criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco')
}
