// gestion des erreurs sur les validations de formulaires
import { on } from 'anticore'

// # nettoyage des erreurs au submit
function clean (event) {
  event.target.querySelectorAll('.error')
    .forEach(remove)
}

function remove (element) {
  element.parentNode.removeChild(element)
}

on('form', (element, next) => {
  element.addEventListener('submit', clean)
  next()
})

// Ajout des erreurs envoyées par le serveur et les places sur le bon input
// recherche des classes error avec une autre classe data-name, typiquement '<ins class="error" data-name="content">Invalid content</ins>'
on('.anticore .error[data-name]', (element, next) => {
  // Ajout de l'erreur au parent du input qui porte ce nom
  document.querySelector(`input[name="${element.dataset.name}"]`)
    .parentNode
    .appendChild(element)

  next()
})
