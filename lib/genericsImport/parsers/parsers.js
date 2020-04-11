import trace from '@lcf.vs/generics/lib/utils/trace.js'
import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'
import config from '../../../generics.config.js'
import myParsers from '../../../futurModule/extendedGenerics/validation/myParsers/myParsers.js'

export default trace({
  ...parsers,
  myParsers
}, config.parsers)
