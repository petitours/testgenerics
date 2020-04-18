import entity from '@lcf.vs/generics/lib/knex/entity.js'
import modColumn from '../../../futurModule/extendedGenerics/defaultEntities/modColumn/modColumn.js'
import libColumn from '../../genericsExtended/defaultEntities/libColumn/libColumn.js'

export default {
  ...entity,
  modColumn,
  libColumn
}
