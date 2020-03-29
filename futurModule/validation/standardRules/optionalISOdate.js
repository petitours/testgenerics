

import parsers from "../../../lib/validation/parsers/parsers.js";

export default function optionalISOdate({coalesce,min,max}){
  return [
      parsers.misc.coalesce({coalesce}),           // recupère la valeur par defaut si pas de valeur
      parsers.validation.basicRules.ISOdate.nowToISOdatestring(),       // recupère une chaine ISO avec que la date si la valeur est à 'now' soit 2020-03-18
      parsers.validation.basicRules.ISOdate.type(),                   // fourni une Date locale correspondant au jour indiqué, seuls les jour
      parsers.datetime.min({min}),
      parsers.datetime.max({max}),
   ]
}