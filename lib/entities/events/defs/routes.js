import attempt from '@lcf.vs/generics/lib/express/attempt.js'

export default (app, hooks) => {
  app.post('/events/create', attempt(hooks.create))
  app.get('/events/search', attempt(hooks.search))
  app.get('/events/find/:id', attempt(hooks.find))
  app.post('/events/update/:id', attempt(hooks.update))
  app.get('/events/archive/:id', attempt(hooks.archive))
  app.get('/events/delete/:id', attempt(hooks.delete))
}
