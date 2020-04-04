
import hooks from '@lcf.vs/generics/lib/knex/hooks/hooks.js'
import configure from '@lcf.vs/generics/lib/knex/qb.js'
import env from '../../bootstrap.js'
import knexfile from '../../knexfile.js'

const qb = configure(knexfile[env.NODE_ENV])

const knexContext = Object.freeze({
  archivedDate: 'archivedDate',
  createdDate: 'createdDate',
  id: 'id' ,
  updatedDate: 'updatedDate',
  qb,
})

qb.addHook('before', 'select', '*', hooks.statements(knexContext))
qb.addHook('before', 'select', '*', hooks.archivedDate(knexContext))
qb.addHook('after', 'select', '*', hooks.rows(knexContext))
qb.addHook('before', 'insert', '*', hooks.id(knexContext))
qb.addHook('before', 'insert', '*', hooks.createdDate(knexContext))
qb.addHook('before', 'insert', '*', hooks.data(knexContext))
qb.addHook('before', 'insert', '*', hooks.statements(knexContext))
qb.addHook('before', 'update', '*', hooks.id(knexContext))
qb.addHook('before', 'update', '*', hooks.updatedDate(knexContext))
qb.addHook('before', 'update', '*', hooks.data(knexContext))
qb.addHook('before', 'update', '*', hooks.statements(knexContext))
qb.addHook('before', 'delete', '*', hooks.statements(knexContext))

export default knexContext
