import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default function requiredEntity ({ qb, table, id }) {
  return [
    parsers.misc.required(),
    parsers.native.number.type(),
    parsers.native.number.min({ min: 0 }),
    parsers.native.number.step({ min: 0, step: 1 }),

    parsers.knex.type({ qb, table, id }) // vérifie que l'element existe en base et si oui on récupère l'objet (comme ca ferait pour uen date...)
  ]
}
