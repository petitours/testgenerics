import hooks from '../../../genericsImport/hooks/hooks.js'
import inputs from './inputs.js'
import table from './table.js'

export default ({
  knexContext,
  renderer,
  templates = {}
}) => ({
  archive: [
    ...hooks.request.input.all(inputs.archive),
    hooks.knex.archiveEntity(knexContext, table),
    renderer(({ entity }) => entity, templates.archive)
  ],
  create: [
    ...hooks.request.input.all(inputs.create),
    hooks.knex.createEntity(knexContext, table),
    renderer(({ entity }) => entity, templates.create)
  ],
  delete: [
    ...hooks.request.input.all(inputs.delete),
    hooks.knex.deleteEntity(knexContext, table),
    renderer(({ entity }) => entity, templates.delete)
  ],
  find: [
    ...hooks.request.input.all(inputs.find),
    hooks.knex.findEntity(knexContext, table),
    renderer(({ entity }) => entity, templates.find)
  ],
  search: [
    ...hooks.request.input.all(inputs.search),
    hooks.knex.searchEntities(knexContext, table),
    renderer(({ entities }) => entities, templates.search)
  ],
  update: [
    ...hooks.request.input.all(inputs.update),
    hooks.knex.updateEntity(knexContext, table),
    renderer(({ entity }) => entity, templates.update)
  ]
})
