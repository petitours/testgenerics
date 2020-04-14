import configure from '@lcf.vs/generics/lib/knex/configure.js'
import { env } from 'process'
import * as knexfile from '../../knexfile.js'
import entities from '../entities/entities.js'

export default configure(knexfile[env.NODE_ENV || 'development'], entities)
