import hooks from '../../../genericsImport/hooks/hooks.js'
import inputs from './inputs.js'
import table from './table.js'
import searchViewer from '../viewers/searchViewer.js'

export default ({
  dao,
  templates
}) => ({
  archive: [
    ...hooks.request.input.all(inputs.archive),
    hooks.request.xhr(),
    hooks.knex.archiveEntity(dao, table), // archivera que si confirmation=true
    hooks.libHooks.response.confirmedRedirector('/calendar'),
    hooks.response.redirector(),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.archive)
  ],

  create: [
    ...hooks.request.input.all(inputs.create),
    hooks.libHooks.calendar.events.periodToBdDate(), // récupère  le tableau de 2 date créé dans les input;all pour le mettre dans le body que peut recevoir createEntity
    hooks.knex.createEntity(dao, table),
    hooks.response.redirector({
      location: '/calendar',
      code: 302
    })
  ],
  getCreate: [
    hooks.response.viewer(() => ({ body: {} })), // filtre le contexte pour ne pas envoyer n'importe quoi au template
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
    hooks.libHooks.calendar.events.periodToBdDate(), // récupère  le tableau de 2 date créé dans les input;all pour le mettre dans le body que peut recevoir createEntity
    hooks.knex.updateEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.redirector({
      location: '/calendar',
      code: 302
    })
  ],

  getUpdate: [
    ...hooks.request.input.all(inputs.getUpdate),
    hooks.knex.findEntity(dao, table),
    hooks.response.viewer(({ entity }) => ({ body: entity })),
    hooks.response.renderer(templates.update)
  ],

  searchGenericGeneric: [
    hooks.request.input.params(inputs.searchGenericGeneric.params), // recupère windows et dateCentral
    hooks.libHooks.inputs.windowsToDate(), // transforme windows+dateCentral en range:{ start, end }
    hooks.request.input.query(inputs.searchGenericGeneric.query), // récupère les eventuels paramèrtes de recherche
    hooks.request.xhr(), // récupère le xhr (savoir si le template doit renvoyer le layout ou pas )
    hooks.libHooks.calendar.events.searchByPeriod(dao, table), // recherche les entitées correspondantes
    hooks.response.viewer(searchViewer()), // Extrait au contexte ce qui doit être envoyé à la vue.
    hooks.response.renderer(templates.search)// appel de la vue
  ],
  searchGenericNow: [
    hooks.request.input.params(inputs.searchGenericNow.params),
    hooks.libHooks.calendar.events.nowToDateCentral(), // on ajoute la dateCentral qui est imposée sur cette route
    hooks.libHooks.inputs.windowsToDate(),
    hooks.request.input.query(inputs.searchGenericNow.query),
    hooks.request.xhr(),
    hooks.libHooks.calendar.events.searchByPeriod(dao, table),
    hooks.response.viewer(searchViewer()),
    hooks.response.renderer(templates.search)
  ]
})
