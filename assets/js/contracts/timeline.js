import { on } from 'anticore'
import itemscope from '../../../futurModule/utils/metadatas/itemscope.js'
import aliasAll from '../../../futurModule/utils/object/alias.js'
import { Timeline } from 'vis-timeline/dist/vis-timeline-graph2d.esm.js'

// le container du timeline
let container


// modification du nom des éléments transmis via les metadatas
const aliases = {
  identifier: 'id',
  name: 'content',
  startDate: 'start',
  endDate: 'end',
  
}


// options pour le timeline
const options = {
  /*locale: 'fr', faut charger un truc spécial moment-with-locales.min.js pour que cela fonctionne*/
  showCurrentTime: true,
  zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 50,   // about 50  months in milliseconds
  editable: {
      add: false,         // add new items by double tapping
      updateTime: false,  // drag items horizontally
      updateGroup: false, // drag items from one group to another
      remove: false,       // delete an item by tapping the delete button top right
      overrideItems: false  // allow these options to override item.editable
  }
}




// contract qui va récupérer le le contenaire du timeline s'il est présent
on('#timelineici', (element, next) => {
    container = element
    next()
})



  // le contract qui récupère les metadatas et charge
  on('main.calendar tbody', (element, next) => {
    //recupération des metadonnées dans la page
    let metadatas = [...element.querySelectorAll('tr')].map(itemscope)

    // Changement du nom des propriétés
    metadatas = metadatas.map(aliasAll, aliases)  // execute pour chaque élément de metadatas aliasAll(l'element) en lui passant les modifs à faire en tant que thisArg (le this dans la fonction AliasAll)
     
    // ajout du champ title pour le tooltip
    metadatas = metadatas.map( x => x = { ...x , title:x.content} )

    // Mise a jour du timeline
  //  new vis.Timeline(timeline, new vis.DataSet(metadatas) , options);

   // timeline.setItems(new vis.DataSet(metadatas))
   // timeline.redraw() 
   

    // On crée l'instruction d'instanciation différée, on libère le flux, puis dès qu'il est libéré, l'instanciation est faite et ton timeline fait sa popote
    setTimeout(() => new Timeline(container, metadatas, options))

    // console.log(metadatas)
    next()
  })