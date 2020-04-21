import {
  twoDateDay,
  twoDateFromCenter,
  twoDateMonth,
  twoDateWeek,
  twoDateYear
} from '../../../../../futurModule/dates/centerDate.js'
import toSQLDate from '@lcf.vs/generics/lib/types/date/toSQLDate.js'

// ici dateCentral contient une date valide et windows contient une chaine de caractères qu'il faut analyser ! (un nombre au forma chaine ou day;week, month ou year)
export default function windowsToDate (dao, table) {
  return async (
    {
      context
    }) => {
    const { params: { windows, dateCentral } = {} } = context

    let range

    if (windows === 'year') {
      range = twoDateYear(dateCentral)
    } else if (windows === 'month') {
      range = twoDateMonth(dateCentral)
    } else if (windows === 'week') {
      range = twoDateWeek(dateCentral)
    } else if (windows === 'day') {
      range = twoDateDay(dateCentral)
    } else if (+windows && windows > 0) {
      range = twoDateFromCenter(dateCentral, Number(windows)) // le cas où on a saisi un nombre
    } else {
      throw new TypeError(`${windows} n'est pas soit un entier strictement supérieur à 0, soit year, month, week ou day !`)
    }

    if (!range) {
      throw new TypeError(`${windows} n'est pas soit un entier strictement supérieur à 0, soit year, month, week ou day !`)
    }

    return {
      ...context,
      range
    }
  }
}
