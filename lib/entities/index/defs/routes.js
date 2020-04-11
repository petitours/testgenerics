import attempt from '@lcf.vs/generics/lib/express/attempt.js'

export default (app, hooks) => {
  app.get('/', attempt(hooks.display))
}
