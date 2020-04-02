
// test si le nombre est bien un entier
export default function integer () {
  return async value => {
    if (Number.isSafeInteger(value)) {
      return value
    }

    throw new TypeError(`${value} doit être un entier`)
  }
}
