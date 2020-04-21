
export default function nowToDateCentral () {

  return async ({ context }) => {
    let { params } = context

    params = {
      ...params,
      dateCentral: new Date()
    }

    return {
      ...context,
      params
    }
  }
}
