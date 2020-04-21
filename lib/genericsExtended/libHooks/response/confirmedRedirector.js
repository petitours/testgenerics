
export default function confirmedRedirector (destination) {
  return async ({ context }) => {
    const { query: { confirmation } } = context
    let location

    if (confirmation) {
      location = destination
    }

    return {
      ...context,
      location
    }
  }
}
