
export default function periodToBdDate () {
  return async ({ context }) => {
    const { body: { period: [startDate, endDate], ...body } } = context

    return {
      ...context,
      body: {
        ...body,
        startDate,
        endDate
      }
    }
  }
}
