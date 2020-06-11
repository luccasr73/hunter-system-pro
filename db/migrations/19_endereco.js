exports.up = function (knex) {
  return knex.schema.createTable('endereco', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.string('cep')
    table.string('logradouro')
    table.string('numero')
    table.string('bairro')
    table.string('cidade')
    table.string('uf')
    table.string('complemento')
  }).then(() => {
    console.log('tabela endereco criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco')
}
