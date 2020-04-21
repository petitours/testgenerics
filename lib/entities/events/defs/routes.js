import attempt from '@lcf.vs/generics/lib/express/attempt.js'

export default (app, hooks) => {
  app.get('/calendar', function (request, response) { response.redirect(301, '/calendar/10/2020-04-17') })
  app.get('/events/create', attempt(hooks.getCreate))
  app.post('/events/create', attempt(hooks.create))
  app.get('/calendar/:windows/now', attempt(hooks.searchGenericNow))
  app.get('/calendar/:windows/:dateCentral', attempt(hooks.searchGenericGeneric))
  app.get('/events/find/:id', attempt(hooks.find))
  app.post('/events/update/:id', attempt(hooks.update))
  app.get('/events/archive/:id', attempt(hooks.archive))
  app.get('/events/delete/:id', attempt(hooks.delete))
}
