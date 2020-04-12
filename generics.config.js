import hooks from '@lcf.vs/generics/lib/express/hooks/hooks.js'
import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default {
  hooks: {
    depth: 5,
    name: 'hooks',
    logger: hooks.log.logger
  },
  parsers: {
    //depth: 5,
    name: 'parsers',
    logger: parsers.log.logger
  }
}
