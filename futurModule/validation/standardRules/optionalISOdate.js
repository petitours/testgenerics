import optional from "../basicRules/optional.js"
import nowToISOdatestring from "../basicRules/ISOdate/nowToISOdatestring.js"
import ISOdate from "../basicRules/ISOdate/ISOdate.js"
import minDatetime from "../basicRules/datetime/minDatetime.js"
import maxDatetime from "../basicRules/datetime/maxDatetime.js"


optionalISOdate

export default function optionalISOdate({defaut,min,max}){
  return [
      optional({defaut}),           // recupère la valeur par defaut si pas de valeur
      nowToISOdatestring(),       // recupère une chaine ISO avec que la date si la valeur est à 'now' soit 2020-03-18
      ISOdate(),                   // fourni une Date locale correspondant au jour indiqué, seuls les jour
      minDatetime({min}),
      maxDatetime({max}),
   ]
}