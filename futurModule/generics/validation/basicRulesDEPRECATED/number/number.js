
// test si la chaine est bien un nombre
export default function number () {
  return async value => {
    const parsed = +value

    if (!Number.isNaN(parsed) && Number.isFinite(parsed) && parsed.toString(10) === value) {
      return parsed
    }

    throw new TypeError(`${value} doit être un nombre`)
  }
}
