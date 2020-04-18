import hooks from '../../../genericsImport/hooks/hooks.js'
import inputs from './inputs.js'
import table from './table.js'

const calendarHooks = ({
  dao,
  templates
}) => ({
  treatment: [
    hooks.request.xhr(),
    hooks.modHooks.windowsToDate(),
    hooks.libHooks.calendar.events.searchByPeriod(dao, table),
    hooks.response.viewer(({ entities }) => ({
      body: entities,
      meta: {
        title: 'TatAgenda'
      }
    })),
    hooks.response.renderer(templates.search)
  ],
  entryGenericGeneric: [
    hooks.request.input.params(inputs.searchGenericGeneric.params),
    hooks.request.input.query(inputs.searchGenericGeneric.query)
  ]
})

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
  update: [
    ...hooks.request.input.all(inputs.update),
    hooks.request.xhr(),
    hooks.knex.updateEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.update)
  ],
  // searchGenericGeneric: calendarHooks.treatment.concat(calendarHooks.entryGenericGeneric)
  searchGenericGeneric: [
    hooks.request.input.params(inputs.searchGenericGeneric.params),
    hooks.request.input.query(inputs.searchGenericGeneric.query),
    hooks.request.xhr(),
    hooks.modHooks.windowsToDate(),
    hooks.libHooks.calendar.events.searchByPeriod(dao, table),
    hooks.response.viewer(({ entities }) => ({
      body: entities,
      meta: {
        title: 'TatAgenda'
      }
    })),
    hooks.response.renderer(templates.search)
  ],
  searchGenericNow :[
    hooks.request.input.params(inputs.searchGenericGeneric.params),
    //ici hooks pour ajouter datecentrale qui n'a pas été fournie
     hooks.request.input.query(inputs.searchGenericGeneric.query),
    hooks.request.xhr(),
    hooks.modHooks.windowsToDate(),
    hooks.libHooks.calendar.events.searchByPeriod(dao, table),
    hooks.response.viewer(({ entities }) => ({
      body: entities,
      meta: {
        title: 'TatAgenda'
      }
    })),
    hooks.response.renderer(templates.search)
  ]
})
