import hooks from '@lcf.vs/generics/lib/express/hooks/hooks.js'
import trace from '@lcf.vs/generics/lib/utils/trace.js'
import config from '../../../generics.config.js'
import libHooks from '../../genericsExtended/libHooks/libHooks.js'
import modHooks from '../../../futurModule/extendedGenerics/modHooks/modHooks.js'

export default trace({
  ...hooks,
  libHooks,
  modHooks
}, config.hooks)
