import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'
import myparsers from '../../../futurModule/validation/validation.js'

// export generics module parsers AND my parsers
export default {
  ...parsers,
  myparsers
}
