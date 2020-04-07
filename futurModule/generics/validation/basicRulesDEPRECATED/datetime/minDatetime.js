
// retourne une date si cette ci est >= à la valeur mini
// les {} sur le min permettent de récupérer la propriété min d'un objet config par exemple
export default function minDatetime ({ min }) {
  const minimum = new Date(min)
  if (minimum.toString() === 'Invalid Date') {
    throw new TypeError(`${min} n'est pas un datetime valide comme minimum !`)
  }

  return async value => {
    if (value < minimum) {
      throw new RangeError(`doit être une date supérieure ou égale à ${min}`)
    } else {
      return value
    }
  }
}
