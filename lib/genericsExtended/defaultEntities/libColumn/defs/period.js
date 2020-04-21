
import type from '@lcf.vs/generics/lib/knex/column/type.js'
import w3c from '@lcf.vs/generics/lib/validation/parsers/w3c/w3c.js'
import periodDatetime from '../../../../../futurModule/extendedGenerics/validation/myParsers/elementaryRules/periodDatetime/periodDatetime.js'

export default function period (name, {
  separator = ' au ',
  interval = '0',
  min = '1900-01-01T00:00',
  max = '2200-01-01T00:00',
  step = '1',
  value = undefined,
  ...rest
} = {},
parsers = column => [
  w3c.string.type(),
  periodDatetime.stringPeriodToDatetime({ separator }), // retourne un array de 2 chaines
  periodDatetime.twoDatetime(), // retourne un array de 2 datetime à partir de l'array de 2 chaines
  periodDatetime.twoMinDatetime({ min }),
  periodDatetime.twoMaxDatetime({ max }),
  periodDatetime.twoDatetimeStep({ min, step }), // vérifie le step de chacune des 2 datetimes (en seconde)
  periodDatetime.periodInterval({ interval }) // vérifier l'ecart en ms entre les 2 dates
]) {
  return type(name, {
    separator,
    interval,
    min,
    max,
    step,
    value,
    ...rest,
    type: 'text'
  }, parsers)
}
