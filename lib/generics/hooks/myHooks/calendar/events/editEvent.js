
export default function editEvent ({ qb, table }) {
  return async ({ context }) => {
    const { params: { id }, body: { content, periode: [start, end] } } = context

    await qb(table)
      .where('id_evt', '=', id)
      .update({
        content,
        start,
        end
      })
    // .debug(true)

    return {
      ...context,
      location: '/calendar'
    }
  }
}
