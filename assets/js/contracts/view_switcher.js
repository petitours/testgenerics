
import { on } from 'anticore'

// contract principal, le view switcher, qui va remplacer le contenu de la page, son titre et l'url
on('.anticore main', (element, next, url = document.location.href) => {
  const matched_element = element.nodeName.toLowerCase() // non du noeud qui a matché
  const current = document.querySelector(matched_element) // la valeur recue pour l'élément qui a été reconnu dans la réponse

  /* on passe ici pour tous les matchs, donc on peut avoir à faire un truc différent suivant les cas
  if (matched_element === 'main') {
  }
  */

  // on récupère le titre qui est dans la balise h1 du main par défaut (tu ne voulais pas un main sans h1 quand même ??!)
  const title = element.querySelector('h1').textContent

  document.title = title
  history.pushState({}, title, url)

  // console.log({ current, element })
  current.parentNode.replaceChild(element, current)

  next() // libération du flux, passage au contract d'aprés
})
