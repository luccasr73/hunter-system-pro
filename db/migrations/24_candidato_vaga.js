exports.up = function (knex) {
  return knex.schema.createTable('candidato_vaga', function (table) {
    table.engine('INNODB')
    table.increments().primary()
    table.integer('id_vaga').unsigned().notNullable()
      .references('id').inTable('vaga')
    table.integer('id_candidato').unsigned().notNullable()
      .references('id').inTable('candidato')
    table.boolean('selecionado')
  }).then(() => {
    console.log('tabela candidato_vaga criada')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('candidato_vaga')
}
