
exports.up = function(knex) {
  return knex.schema
    .createTable('t_agenda_evt', function (table) {
      table.increments('id_evt').primary();
      table.string('content', 100).notNullable() ;
      table.dateTime('start').notNullable();
      table.dateTime('end').notNullable();
    })
};



exports.down = function(knex) {
  return knex.schema
      .dropTable('t_agenda_evt')
};
