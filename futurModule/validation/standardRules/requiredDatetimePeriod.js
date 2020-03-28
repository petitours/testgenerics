import required from "../basicRules/required.js";
import string from "../basicRules/string/string.js";
import stringPeriodToDatetime from "../elementaryRules/period_datetime/stringPeriodToDatetime.js";
import twoDatetime from "../elementaryRules/period_datetime/twoDatetime.js";
import twoMinDatetime from "../elementaryRules/period_datetime/twoMinDatetime.js";
import twoMaxDatetime from "../elementaryRules/period_datetime/twoMaxDatetime.js";
import twoDatetimeStep from "../elementaryRules/period_datetime/twoDatetimeStep.js";
import periodeEcart from "../elementaryRules/period_datetime/periodeEcart.js";


export default function requiredDatetimePeriod({separator,min, max, step, ecartms}){
  return [
    required(),              // retourne une chaine si valide
    string(),                // retourne une string si valide
    stringPeriodToDatetime({separator}), // retourne un array de 2 chaines    
    twoDatetime() ,          // retourne un array de 2 datetime à partir de l'array de 2 chaines
    twoMinDatetime( {min} ),
    twoMaxDatetime( {max} ),
    twoDatetimeStep({min, step}),      // vérifie le step de chacune des 2 datetimes (en seconde)
    periodeEcart({ecartms}),     // vérifier l'ecart en ms entre les 2 dates 
   ]
}

