
exports.up = function (knex) {
  return knex.schema.table('t_agenda_evt', function (table) {
    table.boolean('isDelete').notNull().defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.table('t_agenda_evt', function (table) {
    table.dropColumn('isDelete')
  })
}
