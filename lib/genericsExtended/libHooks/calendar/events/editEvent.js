
export default function editEvent ({ qb, table }) {
  return async ({ context }) => {
    const { params: { id }, body: { content, periode: [start, end] } } = context

    await qb(table)
      .where('id', '=', id)
      .update({
        content,
        start,
        end
      })
    // .trace(true)

    return {
      ...context,
      location: '/calendar'
    }
  }
}
