import { on } from 'anticore'

// Ajout de la lightbox au main de la page 
on('.anticore .lightbox', (element, next) => {

    document.querySelector('main').appendChild(element)

    next() // libération du flux, passage au contract d'aprés
})
