import parsers from '../../../../lib/generics/parsers/parsers.js'
import utils from '../../../../lib/generics/utils/utils.js'

export default function optionalDateISO ({ value, min, max }) {
  return [
    parsers.misc.value({ value }), // recupère la valeur par defaut si pas de valeur
    utils.myUtils.trace('dateisologvalue'),
    parsers.myparsers.basicRules.ISOdate.nowToISOdatestring(), // recupère une chaine ISO avec que la date si la valeur est à 'now' soit 2020-03-18
    utils.myUtils.trace('dateisonowToISOdatestring'),
    parsers.myparsers.basicRules.ISOdate.type(), // fourni une Date locale correspondant au jour indiqué, seuls les jour
    utils.myUtils.trace('dateisotype'),
    parsers.w3c.datetime.min({ min }),
    utils.myUtils.trace('dateisoMin'),
    parsers.w3c.datetime.max({ max }),
    utils.myUtils.trace('dateisoMax')
  ]
}
