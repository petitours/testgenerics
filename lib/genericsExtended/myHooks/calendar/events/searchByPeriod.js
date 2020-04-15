import hooks from '@lcf.vs/generics/lib/express/hooks/hooks.js'

export default function searchByPeriod (dao, table) {
  const search = hooks.knex.searchEntities(dao, table)

  return async (
    {
      context,
      ...rest
    }, {
      constraints = statement => statement,
      selector = '*'
    } = {}) => {
    const { query: { range } } = context

    const entities = await search({ context, ...rest }, {
      constraints (statement) {
        return constraints(statement)
          .whereBetween('startDate', range)
          .orWhereBetween('endDate', range)
      },
      selector
    })

    return {
      ...context,
      entities
    }
  }
}


/*
export default function byPeriod ({ qb, table }) {
  return async ({ context }) => {
    const { query: { range: { start, end } = {} } = {} } = context

    const events = await qb(table)
      .whereBetween('start', [start, end])
      .orWhereBetween('end', [start, end])
    // TODO OR (start <= '" + Twodate.start.toISOString() + "' AND end >= '" + Twodate.end.toISOString() + "') \
      .orderBy('start')
      // .trace(true)

    return {
      ...context,
      events
    }
  }
}
*/
