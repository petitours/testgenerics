// Gestion d'anticore, import des contracts puis du view switcher puis lancement du trigger anticore
// Begin of custom contracts
import './contracts/timeline.js' // mise a jour du timeline
// import './contracts/refresher.js' // a importer avant le view-switcher
import './contracts/form_errors.js' // gestion des messages d'erreur sur validation de formulaire

import './contracts/lightbox-closer.js' // gestion de la fermeture des lightbox

import './contracts/datatimepickerRange.js' // ajout d'un datatimepicker sur les champs qui le demandent

// End of custom contracts
import './contracts/view_switcher.js' // doit toujours etre en dernier avant import 'anticore-contracts/fetchers/defaults.js' pour que anticore puisse voir tous les contracts avant que l'utilisateur ne voit le contenu
// End, une fois que le tout dernier est bien en dernier :-)
import './contracts/lightbox.js' // exception, il va apres le switcher parce u'il a besoin du main pour afficher quelquechose dedans

// Handle the anchors `click` and forms `submit`, to fetch them in AJAX, automatically
import 'anticore-contracts/fetchers/defaults.js'
import { trigger } from 'anticore'

// Triggers the contracts on the current document
trigger()
