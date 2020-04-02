
// Vérifie que les 2 datetime d'un array ont bien un ecart en seconde suffisant
export default function periodeEcart ({ ecartms }) {
  return async value => {
    if (value[1] - value[0] >= ecartms) {
      return value
    }

    throw new RangeError(`l'écart entre les 2 dates doit être supérieur à ${ecartms} ms`)
  }
}
