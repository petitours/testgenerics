exports.up = function (knex) {
  return knex.schema.table('t_agenda_evt', function (table) {
    table.dropColumn('isDelete')
    table.dateTime('archivedAt').nullable().defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.table('t_agenda_evt', function (table) {
    table.boolean('isDelete').notNull().defaultTo(false)
    table.dropColumn('archivedAt')
  })
}
