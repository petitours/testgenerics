import { twoDateYear, twoDateMonth, twoDateWeek, twoDateFromCenter, twoDateDay } from '../../../../dates/centerDate.js'

// retourne une range de datetime à partir de 'date' et d'une range en jour ou valeurs defaultType
export default function twoDateFromRange () {
  return async (value, fields) => {
    // vérifiacation que l'on a bien la condition préalablement parsée, nécessaire à ce parssage
    if (!fields.hasOwnProperty('date')) {
      throw new Error('missing precondition')
    }

    // on récupère la date qui a été validée avant ! qui se trouve déjà dans les retours du parsage
    const { date } = fields

    if (value === 'year') {
      return twoDateYear(date)
    } else if (value === 'month') {
      return twoDateMonth(date)
    } else if (value === 'week') {
      return twoDateWeek(date)
    } else if (value === 'day') {
      return twoDateDay(date)
    } else if (+value && value > 0) {
      return twoDateFromCenter(date, Number(value)) // le cas où on a saisi un nombre
    } else {
      throw new TypeError(`${value} n'est pas soit un entier strictement supérieur à 0, soit year, month, week ou day !`)
    }
  }
}
