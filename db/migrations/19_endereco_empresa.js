exports.up = function (knex) {
  return knex.schema.createTable('endereco_empresa', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_empresa').unsigned().notNullable()
      .references('id').inTable('empresa')
    table.string('cep')
    table.string('logradouro')
    table.string('numero')
    table.string('bairro')
    table.string('cidade')
    table.string('uf')
    table.string('complemento')
  }).then(() => {
    console.log('tabela endereco_empresa criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco_empresa')
}
