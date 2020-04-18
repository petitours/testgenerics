
export default function range (min, max, format = value => value) {
  return [...Array(max - min + 1).keys()]
    .map(key => format(key + min))
}
