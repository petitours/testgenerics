
import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'
import period_datetime from '../elementaryRules/period_datetime/period_datetime.js'
import utils from '../../../../lib/generics/utils/utils.js'

export default function requiredDatetimePeriod ({ separator, min, max, step, ecartms }) {
  return [
    parsers.misc.required(), // retourne une chaine si valide
    utils.myUtils.trace('requiredDatetimePeriod-Required'),
    parsers.w3c.string.type(), // retourne une string si valide
    utils.myUtils.trace('requiredDatetimePeriod-Type'),
    period_datetime.stringPeriodToDatetime({ separator }), // retourne un array de 2 chaines
    utils.myUtils.trace('requiredDatetimePeriod-PeriodeToString'),
    period_datetime.twoDatetime(), // retourne un array de 2 datetime à partir de l'array de 2 chaines
    utils.myUtils.trace('requiredDatetimePeriod-twoDatetime'),
    period_datetime.twoMinDatetime({ min }),
    utils.myUtils.trace('requiredDatetimePeriod-twoMin'),
    period_datetime.twoMaxDatetime({ max }),
    utils.myUtils.trace('requiredDatetimePeriod-twoMax'),
    period_datetime.twoDatetimeStep({ min, step }), // vérifie le step de chacune des 2 datetimes (en seconde)
    utils.myUtils.trace('requiredDatetimePeriod-twoStep'),
    period_datetime.periodeEcart({ ecartms }), // vérifier l'ecart en ms entre les 2 dates
    utils.myUtils.trace('requiredDatetimePeriod-Ecart')
  ]
}
