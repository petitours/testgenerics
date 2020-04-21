
import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'
import periodDatetime from '../elementaryRules/periodDatetime/periodDatetime.js'

export default function requiredDatetimePeriod ({ separator, min, max, step, ecartms }) {
  return [
    parsers.misc.required(), // retourne une chaine si valide
    parsers.w3c.string.type(), // retourne une string si valide
    periodDatetime.stringPeriodToDatetime({ separator }), // retourne un array de 2 chaines
    periodDatetime.twoDatetime(), // retourne un array de 2 datetime à partir de l'array de 2 chaines
    periodDatetime.twoMinDatetime({ min }),
    periodDatetime.twoMaxDatetime({ max }),
    periodDatetime.twoDatetimeStep({ min, step }), // vérifie le step de chacune des 2 datetimes (en seconde)
    periodDatetime.periodInterval({ ecartms }) // vérifier l'ecart en ms entre les 2 dates
  ]
}
