import knex from 'knex'
import * as config from './config.js'

const qb = knex(config)

qb.migrate.latest()
  .then(([, log]) => {
    if (!log.length) {
      console.info('Database is already up to date');
    } else {
      console.info('Ran migrations: ' + log.join(', '));
    }
  })
  .catch(error => console.error(error))