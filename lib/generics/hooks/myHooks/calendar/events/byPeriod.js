
export default function byPeriod ({ qb, table }) {
  return async ({ context }) => {
    // console.log(context)

    const { query: { range: { start, end } = {} } = {} } = context

    // const { context: { query: { range: { start, end } = {} } = {} } } = context

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
