import env from'../bootstrap.js'
export * from './common.js'

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './knex/dev/db.sqlite3',
    },
    migrations: {
      directory: './knex/dev/migrations'
    },
    seeds: {
      directory: './knex/dev/seeds'
    }
  },
  
  production: {
    client: 'mysql2',  
    connection: { 
      host : env.DB_HOST,
      user : env.DB_USER,  
      password : env.DB_PASS,  
      database : env.DB_DATABASE,
    },  
    migrations: {
      directory: './knex/dev/migrations'
    },
    seeds: {
      directory: './knex/dev/seeds'
    }
  }
}

export const { client, connection, migrations, seeds } = config[env.NODE_ENV]