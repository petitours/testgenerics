// specific trace

import logger from '@lcf.vs/generics/lib/utils/logger.js'
import genericsConfig from '../../../genericsConfig.js'

export default function trace (label) {
  const log = logger({ format: value => ({ [label]: value }) })

  return async value => {
    if (genericsConfig.modeDebug === true) {
      await log(value)
    }

    return value
  }
}
