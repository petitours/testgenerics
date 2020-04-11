import hooks from '@lcf.vs/generics/lib/express/hooks/hooks.js'
import trace from '@lcf.vs/generics/lib/utils/trace.js'
import config from '../../../generics.config.js'
import myHooks from '../../genericsExtended/myHooks/myHooks.js'

export default trace({
  ...hooks,
  myHooks
}, config.hooks)
