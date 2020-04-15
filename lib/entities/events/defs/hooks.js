import hooks from '../../../genericsImport/hooks/hooks.js'
import inputs from './inputs.js'
import table from './table.js'

export default ({
  dao,
  templates
}) => ({
  archive: [
    ...hooks.request.input.all(inputs.archive),
    hooks.request.xhr(),
    hooks.knex.archiveEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.archive)
  ],
  create: [
    ...hooks.request.input.all(inputs.create),
    hooks.request.xhr(),
    hooks.knex.createEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.create)
  ],
  delete: [
    ...hooks.request.input.all(inputs.delete),
    hooks.request.xhr(),
    hooks.knex.deleteEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.delete)
  ],
  find: [
    ...hooks.request.input.all(inputs.find),
    hooks.request.xhr(),
    hooks.knex.findEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.find)
  ],
  search: [
    ...hooks.request.input.all(inputs.search),
    hooks.request.xhr(),
    hooks.myHooks.calendar.events.searchByPeriod(dao, table),
    // hooks.knex.searchEntities(dao, table), // autocomplete marche pas !
    hooks.response.viewer(({ entities }) => ({ body: entities })),
    hooks.response.renderer(templates.search)
  ],
  update: [
    ...hooks.request.input.all(inputs.update),
    hooks.request.xhr(),
    hooks.knex.updateEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.update)
  ]
})
