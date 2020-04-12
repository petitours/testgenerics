import hooks from '../../../genericsImport/hooks/hooks.js'

export default ({
  renderer,
  templates = {}
}) => ({
  display: [
    ...hooks.request.input.all({}), // nothing is taken into account of what the user specifies as input
    hooks.request.xhr(), // add the request xhr attribute to the context
    renderer(({ title, xhr }) => ({ title, xhr }), templates.display)
  ]
})
