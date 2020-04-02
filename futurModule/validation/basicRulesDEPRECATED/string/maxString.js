
// test le nombre de caractères maximum de la chaine
export default function maxString ({ max }) {
  return async value => {
    const { length } = value
    if (length <= max) {
      return value
    }

    throw new RangeError(`chaine trop longue (doit être inférieure ou égale à ${max} caractères)`)
  }
}
