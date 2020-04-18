# Nommer fonction dans un module

pour faciliter le fonctionnement de l'IDE on nomme l'export

```js
export default function range (min, max, format = value => value) {
  return [...Array(max - min + 1).keys()]
    .map(key => key + min)
}
```
 plutôt que 
```js
export default (min, max, format = value => value) => {
  return [...Array(max - min + 1).keys()]
    .map(key => key + min)
}
```
