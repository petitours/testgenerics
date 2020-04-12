// import compression from 'compression'; // la compression GZIP est à gérer au niveau du reverse proxy en production
import express from 'express'
import session from 'cookie-session'
import helmet from 'helmet'
import multer from 'multer'
import { env } from 'process'
import templates from './website/templates.js'
import knexContext from './lib/genericsImport/knex/knexContext.js'
import route from '@lcf.vs/generics/lib/express/route.js'
import hooks from './lib/genericsImport/hooks/hooks.js'
import entities from './lib/entities/entities.js'

const app = express()
const port = 8080

// configure middleware
app.set('port', env.port || port) // set express to use this port
app.set('views', './website') // set express to look in this folder to render our view
app.set('view engine', 'ejs') // configure template engine

/* gestion de helmet, */
// TODO: d'autres sécurités à gérer...
app.use(helmet())
app.disable('x-powered-by')

// qu'est ce ?
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'secretsession',
  keys: ['FDSDSQFDSfdsdsfsdfds', 'FDSQ45243FDSFDS'],
  // @ts-ignore
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'testnode.68hc08.net',
    path: 'foo/bar',
    expires: expiryDate
  }
})
)

// S'il n'y a pas de todolist dans la session,
// on en crée une vide sous forme d'array avant la suite
app.use(function (request, response, next) {
  if (typeof (request.session.todolist) === 'undefined') {
    request.session.todolist = []
  }
  next()
})

//  statics files
const configStatic = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js', 'css'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (response, path, stat) {
    response.set('x-timestamp', Date.now())
  }
}
app.use('/assets', express.static('assets'))
app.use('/js/vis-timeline', express.static('node_modules/vis-timeline/dist', configStatic)) // pour le CSS de vis-timeline
app.use('/css-ui', express.static('node_modules/@lcf.vs/css-ui', configStatic))
app.use('/flatpickr', express.static('node_modules/flatpickr', configStatic))
app.use('/bootstrap', express.static('node_modules/bootstrap', configStatic))
app.use('/anticore', express.static('node_modules/anticore', configStatic))
app.use('/anticore-contracts/fetchers', express.static('node_modules/anticore-contracts/fetchers', configStatic))
app.use(express.static('assets'))

// par defaut on va utiliser upload.none() pour multer sur les receptions de requete POST
const upload = multer()
app.use(upload.none())

// Routes de l'application
route({
  app,
  entities,
  knexContext,
  renderer: hooks.response.renderer,
  templates
})
/*
app.get('/', attempt(GetHome))
app.get('/calendar', attempt(GetCalendarHomeHooks)) // avec ou sans parametres

app.get('/calendar/add', attempt(GETaddCalendarHooks))
app.post('/calendar/add', attempt(POSTaddCalendarHooks))

app.get('/calendar/edit/:id', attempt(GETeditCalendarHooks))
app.post('/calendar/edit/:id', attempt(POSTeditCalendarHooks))

app.get('/calendar/del/:id', attempt(GetCalendarDelHooks))// avec ous sans confirmation en parametre

app.get('/simuerreur', attempt(GETsimuErrorHooks))*/

// Gestion des erreurs 400
app.use((err, request, response, next) => {
  console.log(err)
  if (err.code === 400) {
    Object.values(err.errors).forEach(error => console.log(error))

    return response.status(400).render('errors/400.ejs', {
      title: 'Bad request',
      errors: err,
      xhr: request.xhr,
      toRefresh: true
    })
  }
  next(err)
})

// 422 error
app.use((err, request, response, next) => {
  if (err.code === 422) {
    return response.render('errors/formRules.ejs', {
      errors: err
    })
  }
  next(err)
})

// Error 500 if any other error
app.use((err, request, response, next) => {
  if (err) {
    console.log(err)
    return response.status(500).render('errors/500.ejs', {
      title: 'Erreur inconnue',
      errors: err,
      xhr: request.xhr,
      toRefresh: true
    })
  }
  next(err)
})

// 404 error. Must be the last !
app.use((request, response, next) => {
  response.status(404).render('errors/404.ejs', {
    title: 'Page inconnue',
    errors: '',
    xhr: request.xhr,
    toRefresh: true
  })
})

// Set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
  console.log(env.NODE_ENV)
})
