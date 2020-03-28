
// test si la chaine recue est une DATE ISO SANS time 2020-12-23
export default function ISOdate() {
  return async value  => {
    //tentative de conversion en datetime
    const madate = new Date(value) 

    if ( madate.toString() === 'Invalid Date') {
      throw new TypeError(`${value} n'est pas une date valide.`)   
    }
    else{
      // on sait qu'on a récupéré une date, est ce bien la partie Date au format ISO ?
      const outString = madate.toISOString().substring(0, 10) //récupère que la partie date du datetime formaté en ISO
      if ( outString === value ){
        return new Date(outString)
      } 
      else{
        throw new TypeError(`${value} n'est pas une date au format yyyy-mm-dd`) 
      }
    } 
  }
}