import defaultEntities from '../../../genericsImport/defaultEntities/defaultEntities.js'

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
    dateCentral: defaultEntities.column.date('dateCentral'),
    windows: defaultEntities.column.number('windows', {
      min: '1',
      max: '10000'
    })
  }
}
