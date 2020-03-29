import parsers from "@lcf.vs/generics/lib/validation/parsers/parsers.js";

export default function requiredID(){
  return [
    parsers.misc.required(),
    parsers.number.type(),
    parsers.number.min({ min: 0 }),
    parsers.number.step({ min: 0, step: 1 })
   ]
}