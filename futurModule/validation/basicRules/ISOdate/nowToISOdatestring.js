
// converti 'now' comme chaine ISOdate sinon retourne la valeur sans la toucher

export default function nowToISOdatestring() {
  return async value  => {
    if ( value === 'now') {
      const madate = new Date() //date à maintenant

      return madate.toISOString().substring(0, 10) // on retourne 2020-12-23
    }
    else{
      return value    
    } 
  }
}