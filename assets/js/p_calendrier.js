import { Timeline, DataSet } from 'vis-timeline'

// DOM element where the Timeline will be attached
const container = document.getElementById('timelineici')

// Configuration for the Timeline
// enable or disable individual manipulation actions
const options = {
  /* locale: 'fr', faut charger un truc spécial moment-with-locales.min.js pour que cela fonctionne */
  showCurrentTime: true,
  zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 50, // about 50  months in milliseconds
  editable: {
    add: false, // add new items by double tapping
    updateTime: false, // drag items horizontally
    updateGroup: false, // drag items from one group to another
    remove: true, // delete an item by tapping the delete button top right
    overrideItems: false // allow these options to override item.editable
  }
}

// Create a Timeline
const timeline = new Timeline(container, new DataSet(), options)

/* sur changement de la zone visible du timeline */
timeline.on('rangechanged', function (properties) {
  alert('Echelle du timeline changée')
})

/* gestion du repositionnement à la date actuelle */
function SetTimelineNow () {
  timeline.moveTo(new Date()) // repositionnement sur la date actuelle
};

/*
    document.getElementById('maintenant').onclick= SetTimelineNow ;
*/

/* gestion du saut d'un ou d'une demie période */
/*
    function SetPlus1Span () {
      const visible = timeline.getWindow() ; //recupere la range de temps affichée
      const ecart = visible.end.getTime() - visible.start.getTime() ; //calcul de l'etendue de la range de temps affichée
      const start = new Date(  visible.start.getTime() + ecart ) ; // le nouveau départ est la fin d'avant
      const end = new Date(  visible.end.getTime() + ecart ) ;

      timeline.setWindow(start ,end);    // change la range de date du timeline
      timeline.redraw() ;
    };

    function SetPlus05Span () {
      const visible = timeline.getWindow() ; //recupere la range de temps affichée
      const demiecart = ( visible.end.getTime() - visible.start.getTime() ) / 2 ; //calcul de l'etendue de la range de temps affichée
      const start = new Date(  visible.start.getTime() + demiecart ) ; // le nouveau départ est la fin d'avant
      const end = new Date(  visible.end.getTime() + demiecart ) ;

      timeline.setWindow(start ,end);    // change la range de date du timeline
      timeline.redraw() ;
    };

    function SetMoins05Span () {
      const visible = timeline.getWindow() ; //recupere la range de temps affichée
      const demiecart = ( visible.end.getTime() - visible.start.getTime() ) / 2 ; //calcul de l'etendue de la range de temps affichée
      const start = new Date(  visible.start.getTime() - demiecart ) ; // le nouveau départ est la fin d'avant
      const end = new Date(  visible.end.getTime() - demiecart ) ;

      timeline.setWindow(start ,end);    // change la range de date du timeline
      timeline.redraw() ;
    };

    function SetMoins1Span () {
      const visible = timeline.getWindow() ; //recupere la range de temps affichée
      const ecart = visible.end.getTime() - visible.start.getTime()  ; //calcul de l'etendue de la range de temps affichée
      const start = new Date(  visible.start.getTime() - ecart ) ; // le nouveau départ est la fin d'avant
      const end = new Date(  visible.end.getTime() - ecart ) ;

      timeline.setWindow(start ,end);    // change la range de date du timeline
      timeline.redraw() ;
    };
     */
/*
    document.getElementById('plus1').onclick= SetPlus1Span ;
    document.getElementById('plus05').onclick= SetPlus05Span ;
    document.getElementById('moins05').onclick= SetMoins05Span ;
    document.getElementById('moins1').onclick= SetMoins1Span ;
    */
