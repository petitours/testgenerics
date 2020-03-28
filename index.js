//import compression from 'compression'; // la compression GZIP est à gérer au niveau du reverse proxy en production
import express from 'express';
import session from 'cookie-session'; 
import helmet from 'helmet';
import multer from 'multer';
//import { bodyParser } from './futurModule/utils/express/hooks/bodyParser.js';
import { GETaddCalendarHooks } from './website/calendar/add/get.js';
import { POSTaddCalendarHooks } from './website/calendar/add/post.js';
import { GETsimuErrorHooks } from './website/simuErreur.js';
import { GEThome } from './website/home/index/get.js';
import { GETcalendarHomeHooks } from './website/calendar/index/get.js';
import attempt from './futurModule/utils/express/attempt.js';
import { GETeditCalendarHooks } from './website/calendar/edit/get.js';
import { POSTeditCalendarHooks } from './website/calendar/edit/post.js';
import env from'./bootstrap.js'
import { GETdelCalendarHooks } from './website/calendar/del/get.js';

const app = express();
const port = 8080 ;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', './website'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine

/*gestion de helmet, */
//TODO: d'autres sécurités à gérer...
app.use(helmet());
app.disable('x-powered-by');

// qu'est ce ? 
const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'secretsession',
  keys: ['FDSDSQFDSfdsdsfsdfds', 'FDSQ45243FDSFDS'],
  // @ts-ignore
  cookie: { secure: true,
            httpOnly: true,
            domain: 'testnode.68hc08.net',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);

// S'il n'y a pas de todolist dans la session,
// on en crée une vide sous forme d'array avant la suite 
app.use(function(request, response, next){
    if (typeof(request.session.todolist) == 'undefined') {
        request.session.todolist = [];
    }
    next();
});



// fichiers statics
const configStatic = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js','css'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (response, path, stat) {
    response.set('x-timestamp', Date.now())
  }
}
app.use('/assets',express.static('assets') );
app.use('/js/vis-timeline',express.static('node_modules/vis-timeline/dist', configStatic)) ; // pour le CSS de vis-timeline
app.use('/css-ui',express.static('node_modules/@lcf.vs/css-ui', configStatic)) ;
app.use('/flatpickr',express.static('node_modules/flatpickr', configStatic)) ;
app.use('/bootstrap',express.static('node_modules/bootstrap', configStatic)) ;
app.use('/anticore',express.static('node_modules/anticore', configStatic)) ;
app.use('/anticore-contracts/fetchers',express.static('node_modules/anticore-contracts/fetchers', configStatic)) ;
app.use(express.static('assets'))

//par defaut on va utiliser upload.none() pour multer sur les receptions de requete POST
const upload = multer()
app.use(upload.none())

// Routes de l'application
app.get('/', attempt(GEThome) ); 
app.get('/calendar', attempt( GETcalendarHomeHooks ) ); // avec ou sans parametre

app.get('/calendar/add',  attempt(GETaddCalendarHooks) );
app.post('/calendar/add', attempt(POSTaddCalendarHooks) );

app.get('/calendar/edit/:id',  attempt(GETeditCalendarHooks) );
app.post('/calendar/edit/:id',  attempt(POSTeditCalendarHooks) );

app.get('/calendar/del/:id',  attempt(GETdelCalendarHooks) );//avec ous sans confirmation en parametre

app.get('/simuerreur', attempt(GETsimuErrorHooks) );


// Gestion des erreurs de parser de formulaire 
/*app.use((err, request, response, next) => {
  if (err && err.message==="validation errors") {
    return response.render('errors/formRules.ejs', {
      errors : err
    });
  }
  next(err)
})

// Gestion des erreurs 422
app.use((err, request, response, next) => {
  if (err.code === 422) {
    return response.status(422).render('errors/422.ejs', {
      title: "Unprocessable entity"
      ,erreur: err.message  + ':  ' + err.errors       
      ,xhr : request.xhr 
      ,torefresh : true
    });
  }
  next(err)
})
*/

// Gestion des erreurs 400
app.use((err, request, response, next) => {
  console.log(err)
  if (err.code === 400) {

    Object.values(err.errors).forEach(error => console.log(error))

    return response.status(400).render('errors/400.ejs', {
      title: "Bad request"
      ,errors: err    
      ,xhr : request.xhr 
      ,torefresh : true
    });
  }
  next(err)
})

// Gestion des erreurs 422
app.use((err, request, response, next) => {
  if (err.code === 422) {
    return response.render('errors/formRules.ejs', {
      errors : err
    });
  }
  next(err)
})

// erreur 500 s'il y a une autre erreur
app.use((err, request, response, next) => {
  if (err) {
    console.log(err)
    return response.status(500).render('errors/500.ejs', {
      title: "Erreur inconnue"
      ,errors: err         
      ,xhr : request.xhr 
      ,torefresh : true
    });
  }
  next(err)
})

// Erreur 404 a laisser à la fin des routes
app.use((request, response, next) => {
  response.status(404).render('errors/404.ejs', {
    title: "Page inconnue"
    ,errors: ""            
    ,xhr : request.xhr 
    ,torefresh : true
  });
});




// Set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
  console.log(env.NODE_ENV)
});