
// est ce un datetime ?
export default function datetime () {
  return async value => {
    const madate = new Date(value)

    if (madate.toString() === 'Invalid Date') {
      throw new TypeError(`${value} n'est pas un datetime valide.`)
    } else {
      return madate
    }
  }
}
