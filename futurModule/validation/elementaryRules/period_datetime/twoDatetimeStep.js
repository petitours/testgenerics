import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'

// teste si le step de la valeur est correct par rapport
export default function twoDatetimeStep ({ min, step }) {
  const test = parsers.w3c.datetime.step({ min, step }) // plus performance de créer le test avant le return (pas une fonction créée a chaque test)

  return async value => {
    return Promise.all(value.map(await test))

    // pas besoin de throw puisque datatime() le fait
  }
}
