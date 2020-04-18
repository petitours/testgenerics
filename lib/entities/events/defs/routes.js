import attempt from '@lcf.vs/generics/lib/express/attempt.js'

export default (app, hooks) => {
  app.get('/calendar', function (request, response) { response.status(301).redirect('/calendar/10/2020-04-17') })
  app.post('/events/create', attempt(hooks.create))
  app.get('/calendar/:windows/:dateCentral', attempt(hooks.searchGenericGeneric))
  app.get('/events/find/:id', attempt(hooks.find))
  app.post('/events/update/:id', attempt(hooks.update))
  app.get('/events/archive/:id', attempt(hooks.archive))
  app.get('/events/delete/:id', attempt(hooks.delete))
}
