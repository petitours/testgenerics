import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default function requiredID () {
  return [
    parsers.misc.required(),
    parsers.native.number.type(),
    parsers.native.number.min({ min: 0 }),
    parsers.native.number.step({ min: 0, step: 1 })
  ]
}
