
// parse les 2 datetime d'une période telle que "2020-03-10 12:00 to 2020-03-17 12:00"
// retourne un tableau de 2 chaines
export default function stringPeriodToDatetime ({ separator }) {
  return async value => {
    const splits = value.split(separator)

    // a t-on bien 2 éléments ?
    if (splits.length === 2) {
      return splits
    } else {
      throw new RangeError(`doit être au format "date1 ${separator} date2"`)
    }
  }
}
