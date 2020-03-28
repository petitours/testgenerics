import required from "../basicRules/required.js";
import string from "../basicRules/string/string.js";
import minString from "../basicRules/string/minString.js";
import maxString from "../basicRules/string/maxString.js";


export default function requiredText({min,max}){
  return [
      required(),
      string(),       // retourne une string si valide
      minString({min}),   
      maxString({max})   
   ]
}

