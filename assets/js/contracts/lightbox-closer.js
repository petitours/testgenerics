import { on } from 'anticore'

// fonction pour fermer le lightbox
function closeLightbox ({ target }) {
  const modal = target.closest('.lightbox')

  modal.parentNode.removeChild(modal)
}

on('.anticore .Anticore-close-lb', (element, next) => {
  element.addEventListener('click', closeLightbox)

  next() // libération du flux, passage au contract d'aprés
})
