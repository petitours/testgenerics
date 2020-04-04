import parsers from '../../../lib/generics/parsers/parsers.js'
import utils from '@lcf.vs/generics/lib/utils/utils.js'

export default function optionalDateISO ({ value, min, max }) {
  return [
    parsers.misc.value({ value }), // recupère la valeur par defaut si pas de valeur
    utils.logger({ format: value => ({ dateisologvalue: value }) }),
    parsers.myparsers.basicRules.ISOdate.nowToISOdatestring(), // recupère une chaine ISO avec que la date si la valeur est à 'now' soit 2020-03-18
    utils.logger({ format: value => ({ nowtoisodate: value }) }),
    parsers.myparsers.basicRules.ISOdate.type(), // fourni une Date locale correspondant au jour indiqué, seuls les jour
    utils.logger({ format: value => ({ isodate: value }) }),
    parsers.w3c.datetime.min({ min }),
    utils.logger({ format: value => ({ datetimemin: value }) }),
    parsers.w3c.datetime.max({ max }),
    utils.logger({ format: value => ({ datetimemax: value }) })
  ]
}
