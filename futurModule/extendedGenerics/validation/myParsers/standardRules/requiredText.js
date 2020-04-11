import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default function requiredText ({ minlength, maxlength }) {
  return [
    parsers.misc.required(),
    parsers.w3c.string.type(), // retourne une string si valide
    parsers.w3c.string.minlength({ minlength }),
    parsers.w3c.string.maxlength({ maxlength }),
  ]
}
