
export default function nowToDateCentral (dao, table) {
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
