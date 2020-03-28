

// affecte une valeur par defaut si la valeur n'est pas présente
export default function optional ({defaut}) {
  
  return async (value = null) => {
   
    if (value !== '' && value !== null) {
      return value
    }
    else {
      return defaut
    }  
  }
}