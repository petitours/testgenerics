import hooks from '../../../genericsImport/hooks/hooks.js'

export default ({
  renderer,
  templates = {}
}) => ({
  display: [
    ...hooks.request.input.all([]),
    renderer(context => context, templates.display)
  ]
})
