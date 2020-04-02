
export default function byPeriod ({ qb, table }) {
  return async ({ context }) => {
    const { query: { range: { start, end } } } = context

    const events = await qb(table)
      .whereBetween('start', [start, end])
      .orWhereBetween('end', [start, end])
    // TODO OR (start <= '" + Twodate.start.toISOString() + "' AND end >= '" + Twodate.end.toISOString() + "') \
      .orderBy('start')
      // .debug(true)

    return {
      ...context,
      events
    }
  }
}
