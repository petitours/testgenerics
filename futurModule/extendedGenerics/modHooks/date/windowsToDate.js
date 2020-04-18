import { twoDateFromCenter } from '../../../dates/centerDate.js'

export default function windowsToDate (dao, table) {
  return async (
    {
      context
    }) => {
    const { params: { windows, dateCentral } = {} } = context

    const plage = twoDateFromCenter(dateCentral, windows)

    return {
      ...context,
      range: plage
    }
  }
}
