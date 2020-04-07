
export default function addEvent ({ qb, table }) {
  return async ({ context }) => {
    const { body: { content, periode: [start, end] } } = context

    await qb(table)
      .insert({
        content,
        start, // une date qui sera convertie en UTC par monknex
        end // une date qui sera convertie en UTC par monknex
      })
      // .trace(true)

    return {
      context
    }
  }
}
