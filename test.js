import route from '@lcf.vs/generics/lib/express/route.js'
import app from '@lcf.vs/generics/lib/tester/app.js'
import process from 'process'
import '../bootstrap.js'
import dao from '../lib/dao/dao.js'
import events from './scripts/events.js'
import index from './scripts/index.js'

route({ app, dao })

Promise.all([
  index,
  events
].map(async test => test()))
  .catch(error => console.error(error))
  .finally(() => process.exit(0))
