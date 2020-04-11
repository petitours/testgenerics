
// Retourne une date si cette ci est <= à la valeur max
// les {} sur le step permettent de récupérer la propriété min d'un objet config par exemple
export default function datetimeStep ({ step }) {
  return async value => {
    /*
    if (value.getTime() > new Date(max).getTime()) {
      throw new RangeError(`doit être une date inférieure ou égale à "${max}"`)
    }
    else { */
    return value
    // }
  }
}
