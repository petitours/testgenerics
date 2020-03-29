
// test si la nombre est positif
export default function positive () {
  return async value  => {

    if (value > 0){
     return value
    }
      
    throw new TypeError(`${value} doit être positif`)      
  }
}