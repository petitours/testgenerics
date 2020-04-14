import fetch from '@lcf.vs/generics/lib/tester/fetch.js'
import log from '@lcf.vs/generics/lib/tester/log.js'
import resolve from '@lcf.vs/generics/lib/tester/resolve.js'

export default async () => {
  const uri = resolve('/')

  const response = await fetch(uri, {})

  log({ [uri]: response })
}
