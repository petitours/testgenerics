import parsers from '../../../lib/generics/parsers/parsers.js'

export default function optionalISOdate ({ value, min, max }) {
  return [
    parsers.misc.value({ value }), // recupère la valeur par defaut si pas de valeur
    parsers.myparsers.basicRules.ISOdate.nowToISOdatestring(), // recupère une chaine ISO avec que la date si la valeur est à 'now' soit 2020-03-18
    parsers.myparsers.basicRules.ISOdate.type(), // fourni une Date locale correspondant au jour indiqué, seuls les jour
    parsers.w3c.datetime.min({ min }),
    parsers.w3c.datetime.max({ max })
  ]
}
