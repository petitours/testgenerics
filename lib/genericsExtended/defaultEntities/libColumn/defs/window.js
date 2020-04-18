import range from '../../../../../futurModule/utils/misc/range.js'
import misc from '@lcf.vs/generics/lib/validation/parsers/misc/misc.js'
import type from '@lcf.vs/generics/lib/knex/column/type.js'

function generate (min, max) {
  const acceptable = [
    'day',
    'month',
    'year',
    'week',
    ...range(+min, +max, value => value.toString())
  ]

  return acceptable
}

export default function windows (name, {
  max = 10000,
  min = 1,
  value = undefined,
  ...rest
} = {},
parsers = column => [
  misc.oneOf(generate(min, max))
]) {
  return type(name, {
    max,
    min,
    value,
    ...rest,
    type: 'string'
  }, parsers)
}
