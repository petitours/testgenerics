

// test le nombre de caractères minimum de la chaine
export default function minString ({min}) {
 
  return  async (value,fields)  => {

    const  {length} = value
    
    if (length >= min) {
      return value
    }
  
    throw new RangeError(`chaine trop courte (doit être supérieure ou égale à ${min} caractères)` )
  }
}