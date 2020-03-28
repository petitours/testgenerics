import knex from 'knex'
import knexHooks from 'knex-hooks'
import * as config from './config.js'

const asPattern = /\s+as\s+/i

const qb = knexHooks(knex(config))

function isDate (value) {
  return Date.prototype.isPrototypeOf(value)
}

function isDatetimeColumn (column = {}) {
  return column.type === 'datetime'
}

function toDatetime (value) {
  return value && isDate(value)
    ? value.toISOString().slice(0, 19).replace('T', ' ')
    : value
}

function fromDatetime (value) {
  return value && !isDate(value)
    ? new Date(value.replace(' ', 'T') + 'Z')
    : value
}

function column (columns, params, name = null) {
  let column

  if (name !== null) {
    column = columns[name]

    if (!column) {
      params.query._statements.every(statement => {
        if (statement.grouping === 'columns') {
          return !statement.value.every(value => {
            const [original, alias] = value.split(asPattern)

            if (alias === name) {
              column = columns[original]

              return false
            }

            return true
          })
        }

        return true
      })
    }
  }

  return column
}

async function data (when, method, table, params, data) {
  await statements(when, method, table, params)
  const columns = await qb(table).columnInfo()

  Object.entries(data).forEach(([name, value]) => {
    if (isDatetimeColumn(column(columns, params, name))) {
      data[name] = toDatetime(value)
    }
  })
}

async function rows (when, method, table, params) {
  const columns = await qb(table).columnInfo()
  const results = [params.result].flat().filter(Boolean)

  results.forEach(row => {
    Object.entries(row).forEach(([name, value]) => {
      if (isDatetimeColumn(column(columns, params, name))) {
        row[name] = fromDatetime(value)
      }
    })
  })
}

async function statements (when, method, table, params) {
  const columns = await qb(table).columnInfo()

  params.query._statements.forEach(statement => {
    if (isDatetimeColumn(column(columns, params, statement.column))) {
      statement.value = Array.isArray(statement.value)
        ? statement.value.map(current => toDatetime(current))
        : toDatetime(statement.value)
    }
  })
}

function insert (when, method, table, params) {
  // @ts-ignore
  return data(when, method, table, params, knexHooks.helpers.getInsertData(params.query))
}

function update (when, method, table, params) {
  // @ts-ignore
  return data(when, method, table, params, knexHooks.helpers.getUpdateData(params.query))
}

qb.addHook('before', 'select', '*', statements)
qb.addHook('after', 'select', '*', rows)
qb.addHook('before', 'insert', '*', insert)
qb.addHook('before', 'update', '*', update)
qb.addHook('before', 'delete', '*', statements)

export default qb

