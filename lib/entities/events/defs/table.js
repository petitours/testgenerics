import defaultEntities from '../../../genericsImport/defaultEntities/defaultEntities.js'

export default {
  name: 'events',
  columns: {
    ...defaultEntities.columns,
    ...defaultEntities.column.text('content', {
      maxlength: '100',
      minlength: '3'
    }),
    ...defaultEntities.column.datetimeWithSeconds('startDate'),
    ...defaultEntities.column.datetimeWithSeconds('endDate')
  },
  virtuals: {
    ...defaultEntities.column.boolean('confirmation'),
    ...defaultEntities.column.date('dateCentral'),
    ...defaultEntities.column.number('windows', {
      min: '1',
      max: '10000'
    })
  }
}
