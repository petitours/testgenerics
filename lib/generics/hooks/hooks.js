
import hooks from '@lcf.vs/generics/lib/express/hooks/hooks.js'
import myHooks from './myHooks/myHooks.js'

export default {
  ...hooks,
  myHooks
}
