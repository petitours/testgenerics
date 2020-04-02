
export default function locatedRedirector (location) {
  return async ({ context, response }) => {
    response.redirect(location)

    return context
  }
}
