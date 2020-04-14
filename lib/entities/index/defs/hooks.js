import hooks from '../../../genericsImport/hooks/hooks.js'

export default ({
  templates = {}
}) => ({
  display: [
    // useless     ...hooks.request.input.all({}), // nothing is taken into account of what the user specifies as input
    hooks.request.xhr(), // add the request xhr attribute to the context
    hooks.response.viewer(() => ({
      body: {},
      meta: {
        title: 'Accueil de TaTa'
      }
    })),
    hooks.response.renderer(templates.display)
  ]
})
