


export default function archiveEntity ({ qb, table, id = 'id', archivedAt = 'archivedAt' }) {
  const query = qb(table)

  return async ({ context }) => {
    const { params: { id: entity }, query: { confirmation } } = context

    if (confirmation) {
      await query.update({
        [archivedAt]: new Date()
      }).where({
        [id]: entity[id]
      })
    }

    return {
      ...context,
      archived: confirmation
    }
  }
}