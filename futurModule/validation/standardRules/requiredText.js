import parsers from "@lcf.vs/generics/lib/validation/parsers/parsers.js";


export default function requiredText({minlength,maxlength}){
  return [
      parsers.misc.required(),
      parsers.string.type(),       // retourne une string si valide
      parsers.string.minlength({minlength}),   
      parsers.string.maxlength({maxlength})   
   ]
}

