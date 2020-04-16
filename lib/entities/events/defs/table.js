import defaultEntities from '../../../genericsImport/defaultEntities/defaultEntities.js'
import parsers from '../../../genericsImport/parsers/parsers.js'

export default {
  name: 'events',
  columns: {
    ...defaultEntities.columns,
    content: defaultEntities.column.text('content', {
      maxlength: '100',
      minlength: '3'
    }),
    startDate: defaultEntities.column.datetimeWithSeconds('startDate'),
    endDate: defaultEntities.column.datetimeWithSeconds('endDate')
  },
  virtuals: {
    confirmation: defaultEntities.column.boolean('confirmation'),
    date: defaultEntities.column.type('date', {}, () => [
      ...parsers.myParsers.standardRules.optionalDateISO({
        value: 'now',
        min: '1900-01-01T00:00',
        max: '2200-01-01T00:00'
      })
    ]),
    range: defaultEntities.column.type('range', {}, () => [
      parsers.misc.value({ value: 'month' }),
      parsers.myParsers.combinatedRules.twoDateFromRange()
    ])
  }
}
