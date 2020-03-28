
// test si la chaine est bien un string
export default function string () {
  return async value  => {
    if (typeof value === 'string' && value.toString() === value) {
      return value
    }
  
    throw new TypeError('doit être une chaine de caractères.')      
  }
}