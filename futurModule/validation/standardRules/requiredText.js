import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default function requiredText ({ minlength, maxlength }) {
  return [
    parsers.misc.required(),
    parsers.native.string.type(), // retourne une string si valide
    parsers.native.string.minlength({ minlength }),
    parsers.native.string.maxlength({ maxlength })
  ]
}
