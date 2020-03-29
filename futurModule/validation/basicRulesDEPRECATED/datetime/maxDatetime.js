

// retourne une date si cette ci est <= à la valeur max
// les {} sur le max permettent de récupérer la propriété min d'un objet config par exemple
export default function maxDatetime ( {max} ) {

  const maximum = new Date(max)
  if (maximum.toString() === 'Invalid Date') {
    throw new TypeError(`${max} n'est pas un datetime valide comme maximum !`)   
  }
  
  return async value => {

    if (value > maximum) {        
      throw new RangeError(`doit être une date inférieure ou égale à ${max}`)
    }
    else {
      return value
    }
     
  }
}