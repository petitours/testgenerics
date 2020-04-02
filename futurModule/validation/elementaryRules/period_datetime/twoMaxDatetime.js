import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

export default function twoMaxDatetime ({ max }) {
  const test = parsers.w3c.datetime.max({ max }) // plus performance de créer le test avant le return (pas une fonction créée a chaque test)

  return async value => {
    return Promise.all(value.map(await test))

    // pas besoin de throw puisque datatime() le fait
  }
}
