


export default function eventsByPeriod ({ qb, table, archivedAt = 'archivedAt' }) {
  return async ({ context }) => {

    const { query: { plage: {start, end} } } = context

    const events = await qb(table)
       /* .where({
          [archivedAt]: null
        })*/
        .whereBetween('start', [ start, end ] )
        .orWhereBetween('end', [ start, end ] )
        //TODO OR (start <= '" + Twodate.start.toISOString() + "' AND end >= '" + Twodate.end.toISOString() + "') \
        .orderBy('start')
        .debug(true)

    //const events = qb.select('*')
    // .where({
   //    [archivedAt]: null
   //  })
   //  .andWhereBetween('start', [ start, end ])
   //  .orWhereBetween('end', [ start, end ])
     //TODO OR (start <= '" + Twodate.start.toISOString() + "' AND end >= '" + Twodate.end.toISOString() + "') \

    return {
      ...context,
      events 
    }
  }
}