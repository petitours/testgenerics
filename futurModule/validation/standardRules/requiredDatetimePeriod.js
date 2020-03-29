
import parsers from "@lcf.vs/generics/lib/validation/parsers/parsers.js";
import period_datetime from "../elementaryRules/period_datetime/period_datetime.js";

export default function requiredDatetimePeriod({separator,min, max, step, ecartms}){
  return [
    parsers.misc.required(),              // retourne une chaine si valide
    parsers.string.type(),                // retourne une string si valide
    period_datetime.stringPeriodToDatetime({separator}), // retourne un array de 2 chaines    
    period_datetime.twoDatetime() ,          // retourne un array de 2 datetime à partir de l'array de 2 chaines
    period_datetime.twoMinDatetime( {min} ),
    period_datetime.twoMaxDatetime( {max} ),
    period_datetime.twoDatetimeStep({min, step}),      // vérifie le step de chacune des 2 datetimes (en seconde)
    period_datetime.periodeEcart({ecartms}),     // vérifier l'ecart en ms entre les 2 dates 
   ]
}

