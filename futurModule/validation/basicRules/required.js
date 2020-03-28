
// vérifie si la valeur est bien présente
export default function required () {
  
  return async (value = null) => {
    if (value !== '' && value !== null) {
      return value
    }
  
    throw new TypeError(`doit être fourni.`)
  }
}